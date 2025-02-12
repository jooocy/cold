import { TokenResponse } from "src/common/response";

export interface AuthUsecase {
  callback(code: string): Promise<TokenResponse>;
}
