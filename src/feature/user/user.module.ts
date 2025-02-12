import { Module } from '@nestjs/common';
import { UserGateway } from './domain/gateway/user.gateway';
import { CreateUserUsecase } from './usecase/create-user/create-user.usecase';
import { CreateUserInteractor } from './usecase/create-user/create-user.interactor';
import { FindUserInteractor } from './usecase/find-user/find-user.interactor';
import { FindUserUsecase } from './usecase/find-user/find-user.usecase';
import { PrismaModule } from 'src/core/db/prisma.module';
import { UserDsMapper } from './database/user.ds.mapper';
import { UpdateUserInteractor } from './usecase/update-user/update-user.interactor';
import { UpdateUserUsecase } from './usecase/update-user/update-user.usecase';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserGateway,
      useClass: UserDsMapper,
    },
    {
      provide: CreateUserUsecase,
      useClass: CreateUserInteractor,
    },
    {
      provide: FindUserUsecase,
      useClass: FindUserInteractor,
    },
    {
      provide: UpdateUserUsecase,
      useClass: UpdateUserInteractor,
    },
  ],
  exports: [CreateUserUsecase, FindUserUsecase, UpdateUserUsecase],
})
export class UserModule {}
