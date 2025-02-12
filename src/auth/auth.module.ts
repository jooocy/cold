import { Module } from '@nestjs/common';
import { GoogleStrategy } from "./google/google.strategy";
import { AuthService } from "./auth.service";
import { AuthController as AuthController } from './presentation/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
