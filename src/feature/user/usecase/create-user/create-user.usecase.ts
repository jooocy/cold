import { UserEntity } from "src/feature/user/domain/model/user.entity";
import { CreateUserUsecaseDto } from "./dto/create-user.usecase.dto";

export interface CreateUserUsecase {
  execute(input: CreateUserUsecaseDto): Promise<UserEntity>;
}

export const CreateUserUsecase = Symbol("CreateUserUsecase");
