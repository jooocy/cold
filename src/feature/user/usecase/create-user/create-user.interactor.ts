import { Inject, Injectable } from "@nestjs/common";
import { UserGateway } from "src/feature/user/domain/gateway/user.gateway";
import { CreateUserUsecaseDto } from "./dto/create-user.usecase.dto";
import { UserEntity } from "src/feature/user/domain/model/user.entity";
import { CreateUserGatewayDto } from "src/feature/user/domain/gateway/dto/create-user.gateway.dto";
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

  toGatewayDto(input: CreateUserUsecaseDto): CreateUserGatewayDto {
    return {
      lastSignedInAt: new Date(),
      nickname: input.nickname,
      profileImageUrl: input.profileImageUrl,
      email: input.email,
      isEmailVerified: input.isEmailVerified,
      phoneNumber: input.phoneNumber,
      isPhoneNumberVerified: input.isPhoneNumberVerified,
    };
  }
}
