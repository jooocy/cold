import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthUsecase } from "../usecase/auth.usecase";
import { TokenResponse } from "src/common/response";

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

  @Post('google/validate')
  async validateGoogleToken(@Body() body: { googleAccessToken: string }): Promise<TokenResponse> {
    return await this.authUsecase.validateGoogleAccessToken(body.googleAccessToken);
  }
}
