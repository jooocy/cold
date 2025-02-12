import { UserEntity } from "src/user/domain/model/user.entity";

export interface FindUserUsecase {
  execute(id: number): Promise<UserEntity>;
}

export const FindUserUsecase = Symbol("FindUserUsecase");