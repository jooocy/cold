import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/jwt/jwt-guard";
import { CurrentUser } from "src/feature/user/decorator/current-user.decorator";
import { FindUserUsecase } from "src/feature/user/usecase/find-user/find-user.usecase";
import { UserEntity } from "../../domain/model/user.entity";

@Controller('users')
export class UsersController {
  constructor(
    @Inject(FindUserUsecase)
    private readonly findUserUsecase: FindUserUsecase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() currentUser: CurrentUser): Promise<UserEntity> {
    return this.findUserUsecase.findById(currentUser.id);
  }
}
