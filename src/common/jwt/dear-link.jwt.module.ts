import { Global, Module } from '@nestjs/common';
import { DearLinkJwtInteractor } from './usecase/dear-link.jwt.interactor';
import { DearLinkJwtUsecase } from './usecase/dear-link.jwt.usecase';
import { JwtStrategy } from './jwt-strategy';

@Global()
@Module({
  providers: [
    {
      provide: DearLinkJwtUsecase,
      useClass: DearLinkJwtInteractor,
    },
    JwtStrategy,
  ],
  exports: [DearLinkJwtUsecase, JwtStrategy],
})
export class DearLinkJwtModule {}
