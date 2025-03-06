import { UserEntity } from "../../domain/model/user.entity";
import { OAuthProvider } from "../../domain/model/user-oauth.entity";
import { UserOAuthEntity } from "../../domain/model/user-oauth.entity";

export interface UpdateUserUsecase {
  updateLastSignedInAt(id: number): Promise<UserEntity>;
  updateProfileImageUrl(id: number, profileImageUrl: string): Promise<UserEntity>;
  updateUserOAuth(input: UpdateUserOAuthUsecase): Promise<UserOAuthEntity>;
}

export interface UpdateUserOAuthUsecase {
  userId: number;
  provider: OAuthProvider;

  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export const UpdateUserUsecase = Symbol('UpdateUserUsecase');