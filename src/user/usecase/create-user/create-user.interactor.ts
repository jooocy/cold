import { Inject, Injectable } from "@nestjs/common";
import { CreateUserUsecase } from "./create-user.usecase";
import { UserGateway } from "src/user/domain/gateway/user.gateway";
import { CreateUserUsecaseDto } from "./dto/create-user.usecase.dto";
import { UserEntity } from "src/user/domain/model/user.entity";
import { CreateUserGatewayDto } from "src/user/domain/gateway/dto/create-user.gateway.dto";

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
      nickname: input.nickname,
      profileImageUrl: input.profileImageUrl,
      email: input.email,
      isEmailVerified: input.isEmailVerified,
      phoneNumber: input.phoneNumber,
      isPhoneNumberVerified: input.isPhoneNumberVerified,
    };
  }
}
