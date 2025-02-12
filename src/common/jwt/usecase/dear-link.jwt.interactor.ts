import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DearLinkJwtUsecase } from './dear-link.jwt.usecase';
import {
  DearLinkAccessTokenRequest,
  DearLinkRefreshTokenRequest,
} from './dear-link.jwt.request';

@Injectable()
export class DearLinkJwtInteractor implements DearLinkJwtUsecase {
  constructor(private readonly jwtService: JwtService) {}

  accessToken(request: DearLinkAccessTokenRequest) {
    return this.jwtService.signAsync({
      expiresIn: '1d',
      ...request,
    });
  }

  refreshToken(request: DearLinkRefreshTokenRequest) {
    return this.jwtService.signAsync({
      expiresIn: '30d',
      ...request,
    });
  }

  verifyRefreshToken(refreshToken: string) {
    return this.jwtService.verifyAsync(refreshToken);
  }
}
