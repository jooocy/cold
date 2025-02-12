import {
  DearLinkAccessTokenRequest,
  DearLinkRefreshTokenRequest,
} from './dear-link.jwt.request';

export interface DearLinkJwtUsecase {
  accessToken(request: DearLinkAccessTokenRequest): Promise<string>;
  refreshToken(request: DearLinkRefreshTokenRequest): Promise<string>;
  verifyRefreshToken(refreshToken: string): Promise<any>;
}

export const DearLinkJwtUsecase = Symbol('DearLinkJwtUsecase');
