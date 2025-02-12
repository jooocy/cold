import { UserEntity } from "../../domain/model/user.entity";

export interface UpdateUserUsecase {
  updateLastSignedInAt(id: number): Promise<UserEntity>;
  updateProfileImageUrl(id: number, profileImageUrl: string): Promise<UserEntity>;
}
  
export const UpdateUserUsecase = Symbol('UpdateUserUsecase');