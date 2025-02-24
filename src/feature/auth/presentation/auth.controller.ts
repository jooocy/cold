import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthUsecase } from "../usecase/auth.usecase";

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthUsecase)
    private readonly authUsecase: AuthUsecase,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {
    return req;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    const { data :{
      accessToken, refreshToken
    }} = await this.authUsecase.callback(req.user);
    return {
      accessToken,
      refreshToken,
    };
  }
}
