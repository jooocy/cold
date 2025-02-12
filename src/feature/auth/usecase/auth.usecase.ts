import { TokenResponse } from "src/common/response";
import { GoogleUser } from "../google/google-user";

export interface AuthUsecase {
  callback(user: GoogleUser): Promise<TokenResponse>;
}

export const AuthUsecase = Symbol("AuthUsecase");