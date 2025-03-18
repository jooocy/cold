import { Controller, Get, Inject, Post, Query, Body, UseGuards } from "@nestjs/common";
import { CreateLinkUsecase } from "../usecase/create-link/create-link.usecase";
import { CreateLinkRequestDto } from "./dtos/request/create-link.request.dto";
import { JwtAuthGuard } from "src/common/jwt/jwt-guard";
import { CurrentUser } from "src/feature/user/decorator/current-user.decorator";

@Controller('links')
export class LinkController {
  constructor(
    @Inject(CreateLinkUsecase)
    private readonly createLinkUsecase: CreateLinkUsecase
  ) {}

  @Get()
  async getMyLink(@Query('id') id: string) {
    return ''
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createLink(@Body() body: CreateLinkRequestDto, @CurrentUser() currentUser: CurrentUser) {
    return this.createLinkUsecase.execute({
      userId: currentUser.id,
      name: body.name,
      description: body.description,
      password: body.password,
      coverImageUrl: body.coverImageUrl,
      nickname: body.nickname,
    })
  }
}