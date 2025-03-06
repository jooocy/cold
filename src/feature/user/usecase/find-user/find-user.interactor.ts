import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { FindUserUsecase } from "./find-user.usecase";
import { UserEntity } from "src/feature/user/domain/model/user.entity";
import { UserGateway } from "src/feature/user/domain/gateway/user.gateway";

@Injectable()
export class FindUserInteractor implements FindUserUsecase {
  constructor(
    @Inject(UserGateway)
    private readonly userGateway: UserGateway,
  ) {}

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userGateway.findByIdOrNull(id);
    if (!user) {
      throw new NotFoundException("User not found, id: " + id);
    }
    return user;
  }

  async findByIdOrNull(id: number): Promise<UserEntity | null> {
    return await this.findById(id);
  }

  async findByIdWithOAuthsOrNull(id: number): Promise<UserEntity | null> {
    return await this.userGateway.findByIdWithOAuthsOrNull(id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userGateway.findByEmailOrNull(email);
    if (!user) {
      throw new NotFoundException("User not found, email: " + email);
    }

    return user;
  }

  async findByEmailOrNull(email: string): Promise<UserEntity | null> {
    return await this.userGateway.findByEmailOrNull(email);
  }
}