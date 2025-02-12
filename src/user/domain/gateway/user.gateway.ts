import { UserEntity } from "../model/user.entity";
import { CreateUserGatewayDto } from "./dto/create-user.gateway.dto";

export interface UserGateway {
  create(input: CreateUserGatewayDto): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity>;
}

export const UserGateway = Symbol("UserGateway");