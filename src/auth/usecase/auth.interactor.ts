import { Injectable } from "@nestjs/common";
import { TokenResponse } from "src/common/response";
import { AuthUsecase } from "./auth.usecase";

@Injectable()
export class AuthInteractor implements AuthUsecase {
   

  async callback(code: string): Promise<TokenResponse> {
    return {
      data: {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
    };
  }
}