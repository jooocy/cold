import { UserEntity } from "../model/user.entity";
import { CreateUserGatewayDto } from "./dto/create-user.gateway.dto";

export interface UserGateway {
  create(input: CreateUserGatewayDto): Promise<UserEntity>;
  createWithOAuth(input: CreateUserGatewayDto): Promise<UserEntity>;
  findByIdOrNull(id: number): Promise<UserEntity | null>;
  findByIdWithOAuthsOrNull(id: number): Promise<UserEntity | null>;
  findByEmailOrNull(email: string): Promise<UserEntity | null>;

  updateLastSignedInAt(id: number): Promise<UserEntity>;
  updateProfileImageUrl(id: number, profileImageUrl: string): Promise<UserEntity>;
}

export const UserGateway = Symbol("UserGateway");