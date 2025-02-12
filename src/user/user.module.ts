import { Module } from '@nestjs/common';
import { UserGateway } from './domain/gateway/user.gateway';
import { CreateUserInteractor } from './usecase/create-user/create-user.interactor';
import { CreateUserUsecase } from './usecase/create-user/create-user.usecase';
import { FindUserInteractor } from './usecase/find-user/find-user.interactor';
import { FindUserUsecase } from './usecase/find-user/find-user.usecase';

@Module({})
export class UserModule {
  providers: [
    {
      provide: UserGateway,
      useClass: UserGateway,
    },
    {
      provide: CreateUserUsecase,
      useClass: CreateUserInteractor,
    },
    {
      provide: FindUserUsecase,
      useClass: FindUserInteractor,
    },
  ];
  exports: [CreateUserUsecase, FindUserUsecase];
}
