export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ErrorResponse {
  message: string;
  code: string;
}
