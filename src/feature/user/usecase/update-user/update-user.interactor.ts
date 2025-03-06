import { Inject, Injectable } from "@nestjs/common";
import { UserGateway } from "../../domain/gateway/user.gateway";
import { UpdateUserUsecase, UpdateUserOAuthUsecase } from "./update-user.usecase";
import { UserEntity } from "../../domain/model/user.entity";
import { UserOAuthEntity } from "../../domain/model/user-oauth.entity";

@Injectable()
export class UpdateUserInteractor implements UpdateUserUsecase {
  constructor(
    @Inject(UserGateway)
    private readonly userGateway: UserGateway
  ) {}

  async updateLastSignedInAt(id: number): Promise<UserEntity> {
    return this.userGateway.updateLastSignedInAt(id);
  }

  async updateProfileImageUrl(id: number, profileImageUrl: string): Promise<UserEntity> {
    return this.userGateway.updateProfileImageUrl(id, profileImageUrl);
  }

  async updateUserOAuth(input: UpdateUserOAuthUsecase): Promise<UserOAuthEntity> {
    return this.userGateway.updateOAuth(input);
  }
}
