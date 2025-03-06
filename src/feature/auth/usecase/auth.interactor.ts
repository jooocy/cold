import { Inject, Injectable } from "@nestjs/common";
import { TokenResponse } from "src/common/response";
import { AuthUsecase } from "./auth.usecase";
import { GoogleUser } from "../google/google-user";
import { CreateUserUsecase } from "src/feature/user/usecase/create-user/create-user.usecase";
import { FindUserUsecase } from "src/feature/user/usecase/find-user/find-user.usecase";
import { DearLinkJwtUsecase } from "src/common/jwt/usecase/dear-link.jwt.usecase";
import { Role } from "src/common/role/role";
import { UpdateUserUsecase } from "src/feature/user/usecase/update-user/update-user.usecase";
import { OAuthProvider } from "src/feature/user/domain/model/user-oauth.entity";

@Injectable()
export class AuthInteractor implements AuthUsecase {
  constructor(
    @Inject(CreateUserUsecase)
    private readonly createUserUsecase: CreateUserUsecase,
    @Inject(FindUserUsecase)
    private readonly findUserUsecase: FindUserUsecase,
    @Inject(UpdateUserUsecase)
    private readonly updateUserUsecase: UpdateUserUsecase,
    @Inject(DearLinkJwtUsecase)
    private readonly dearLinkJwtUsecase: DearLinkJwtUsecase,
  ){
  }   

  async callback(googleUser: GoogleUser): Promise<TokenResponse> {
    let user = await this.findUserUsecase.findByEmailOrNull(googleUser.email);

    if (!user) {
      user = await this.createUserUsecase.execute({
        email: googleUser.email,
        nickname: googleUser.firstName ?? 'link user',
        profileImageUrl: googleUser.picture,
        isEmailVerified: true
      });
    }

    await this.updateUserUsecase.updateLastSignedInAt(user.id);

    const [accessToken, refreshToken] = await Promise.all([
      this.dearLinkJwtUsecase.accessToken({
        id: user.id,
        email: user.email,
        roles: Role.USER
      }),
      this.dearLinkJwtUsecase.refreshToken({
        id: user.id,
        roles: Role.USER
      })
    ]);
    
    return {
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  async validateGoogleAccessToken(googleAccessToken: string): Promise<TokenResponse> {
    try {
      // Google의 userinfo endpoint로 사용자 정보 가져오기
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { 
            Authorization: `Bearer ${googleAccessToken}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Invalid access token');
      }

      const userData = await response.json();
      
      // 사용자 찾기 또는 생성
      let user = await this.findUserUsecase.findByEmailOrNull(userData.email);
      if (!user) {
        user = await this.createUserUsecase.executeWithOAuth({
          email: userData.email,
          nickname: userData.name ?? 'link user',
          profileImageUrl: userData.picture,
          isEmailVerified: userData.email_verified ?? true,
          oauths: [{
            provider: OAuthProvider.GOOGLE,
            accessToken: googleAccessToken,
            refreshToken: '',
            expiresAt: new Date(Date.now() + 3600 * 1000),
          }]
        });
      }

      // JWT 토큰 발급
      const [accessToken, refreshToken] = await Promise.all([
        this.dearLinkJwtUsecase.accessToken({
          id: user.id,
          email: user.email,
          roles: Role.USER
        }),
        this.dearLinkJwtUsecase.refreshToken({
          id: user.id,
          roles: Role.USER
        })
      ]);
      
      return {
        data: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to validate access token');
    }
  }
}