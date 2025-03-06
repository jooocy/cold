import { UserEntity } from "src/feature/user/domain/model/user.entity";
import { CreateUserUsecaseDto, CreateUserWithOAuthUsecaseDto } from "./dto/create-user.usecase.dto";

export interface CreateUserUsecase {
  execute(input: CreateUserUsecaseDto): Promise<UserEntity>;
  executeWithOAuth(input: CreateUserWithOAuthUsecaseDto): Promise<UserEntity>;
}

export const CreateUserUsecase = Symbol("CreateUserUsecase");
