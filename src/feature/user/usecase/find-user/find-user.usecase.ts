import { UserEntity } from "src/feature/user/domain/model/user.entity";

export interface FindUserUsecase {
  findById(id: number): Promise<UserEntity>;
  findByIdOrNull(id: number): Promise<UserEntity | null>;
  findByIdWithOAuthsOrNull(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity>;
  findByEmailOrNull(email: string): Promise<UserEntity | null>;
}

export const FindUserUsecase = Symbol("FindUserUsecase");