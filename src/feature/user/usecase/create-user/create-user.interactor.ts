import { Inject, Injectable } from "@nestjs/common";
import { UserGateway } from "src/feature/user/domain/gateway/user.gateway";
import { CreateUserUsecaseDto, CreateUserWithOAuthUsecaseDto } from "./dto/create-user.usecase.dto";
import { UserEntity } from "src/feature/user/domain/model/user.entity";
import { CreateUserGatewayDto, CreateUserWithOAuthGatewayDto } from "src/feature/user/domain/gateway/dto/create-user.gateway.dto";
import { CreateUserUsecase } from "./create-user.usecase";

@Injectable()
export class CreateUserInteractor implements CreateUserUsecase {
  constructor(
    @Inject(UserGateway)
    private readonly userGateway: UserGateway,
  ) {}

  async execute(input: CreateUserUsecaseDto): Promise<UserEntity> {
    return await this.userGateway.create(this.toGatewayDto(input));
  }

  toGatewayDto(input: CreateUserUsecaseDto | CreateUserWithOAuthUsecaseDto): CreateUserGatewayDto | CreateUserWithOAuthGatewayDto {
    return {
      lastSignedInAt: new Date(),
      nickname: input.nickname,
      profileImageUrl: input.profileImageUrl,
      email: input.email,
      isEmailVerified: input.isEmailVerified ?? false,
      phoneNumber: input.phoneNumber,
      isPhoneNumberVerified: input.isPhoneNumberVerified ?? false,
      ...(('oauths' in input) ? {
        oauths: input.oauths.map(oauth => ({
          provider: oauth.provider,
          accessToken: oauth.accessToken, 
          refreshToken: oauth.refreshToken,
          expiresAt: oauth.expiresAt,
        })),
      } : {}),
    };
  }

  async executeWithOAuth(input: CreateUserWithOAuthUsecaseDto): Promise<UserEntity> {
    return await this.userGateway.createWithOAuth(this.toGatewayDto(input));
  }
}
