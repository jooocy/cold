import { Inject, Injectable } from "@nestjs/common";
import { FindUserUsecase } from "./find-user.usecase";
import { UserEntity } from "src/user/domain/model/user.entity";
import { UserGateway } from "src/user/domain/gateway/user.gateway";

@Injectable()
export class FindUserInteractor implements FindUserUsecase {
  constructor(
    @Inject(UserGateway)
    private readonly userGateway: UserGateway,
  ) {}

  async execute(id: number): Promise<UserEntity> {
    return this.userGateway.findById(id);
  }
}