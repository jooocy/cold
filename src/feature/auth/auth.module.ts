import { Module } from '@nestjs/common';
import { AuthController as AuthController } from './presentation/auth.controller';
import { AuthUsecase } from './usecase/auth.usecase';
import { AuthInteractor } from './usecase/auth.interactor';
import { UserModule } from 'src/feature/user/user.module';
import { DearLinkJwtModule } from 'src/common/jwt/dear-link.jwt.module';

@Module({
imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthUsecase,
      useClass: AuthInteractor,
    },
  ],
})
export class AuthModule {}
