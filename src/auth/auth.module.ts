import { Module } from '@nestjs/common';
import { GoogleStrategy } from "./google/google.strategy";
import { AuthService } from "./auth.service";

@Module({
  imports: [],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
