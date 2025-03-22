import { Inject, Injectable } from "@nestjs/common";
import { Role } from "src/common/interface/interfaces/role";
import { DearLinkJwtUsecase } from "src/common/jwt/usecase/dear-link.jwt.usecase";
import { TokenResponse } from "src/common/response";
import { CreateUserUsecase } from "src/feature/user/usecase/create-user/create-user.usecase";

@Injectable()
export class AuthTestService {
  constructor(
    @Inject(CreateUserUsecase)
    private readonly createUserUsecase: CreateUserUsecase,
    @Inject(DearLinkJwtUsecase)
    private readonly dearLinkJwtUsecase: DearLinkJwtUsecase,
  ) {}

  async createTestUser(body: { email: string, nickname: string, profileImageUrl: string }): Promise<TokenResponse> {
    const user = await this.createUserUsecase.execute({
      email: body.email,
      nickname: body.nickname,
      profileImageUrl: body.profileImageUrl,
      isEmailVerified: true,
    });

    const [accessToken, refreshToken] = await Promise.all([
      this.dearLinkJwtUsecase.accessToken({
        id: user.id,
        email: user.email,
        roles: Role.USER,
      }),
      this.dearLinkJwtUsecase.refreshToken({
        id: user.id,
        roles: Role.USER,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}