import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthUsecase } from "../usecase/auth.usecase";
import { TokenResponse } from "src/common/response";
import { UserEntity } from "src/feature/user/domain/model/user.entity";
import { AuthTestService } from "../usecase/auth-test.service";

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthUsecase)
    private readonly authUsecase: AuthUsecase,
    private readonly authTestService: AuthTestService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {
    return req;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    const {
      accessToken,
      refreshToken,
    } = await this.authUsecase.callback(req.user);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('google/validate')
  async validateGoogleToken(@Body() body: { googleAccessToken: string }): Promise<TokenResponse> {
    return await this.authUsecase.validateGoogleAccessToken(body.googleAccessToken);
  }

  // create test user and return access token
  @Post('test')
  async test(@Body() body: { email: string, nickname: string, profileImageUrl: string }): Promise<TokenResponse> {
    return await this.authTestService.createTestUser(body);
  }
}
