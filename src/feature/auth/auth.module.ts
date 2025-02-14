import { Module } from '@nestjs/common';
import { AuthController as AuthController } from './presentation/auth.controller';
import { AuthUsecase } from './usecase/auth.usecase';
import { AuthInteractor } from './usecase/auth.interactor';
import { UserModule } from 'src/feature/user/user.module';
import { GoogleStrategy } from './google/google.strategy';

@Module({
imports: [UserModule],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    {
      provide: AuthUsecase,
      useClass: AuthInteractor,
    },
  ],
})
export class AuthModule {}
