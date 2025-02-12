export interface TokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  error?: ErrorResponse;
}

export interface ErrorResponse {
  message: string;
  code: string;
}
