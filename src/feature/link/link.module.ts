import { Module } from "@nestjs/common";
import { LinkGateway } from "./domain/gateway/link.gateway";
import { LinkDsMapper } from "./database/link.ds.mapper";
import { PrismaModule } from "src/core/db/prisma.module";
import { LinkController } from "./presentation/link.controller";
import { LinkUsersController } from "./presentation/link-users.controller";
import { LinkUserGateway } from "./domain/gateway/link-user.gateway";
import { LinkUserDsMapper } from "./database/link-user.ds.mapper";
import { VerifyLinkUserUsecase } from "./usecase/verify-link-user/verify-link-user.usecase";
import { VerifyLinkUserInteractor } from "./usecase/verify-link-user/verify-link-user.interactor";

@Module({
  imports: [PrismaModule],
  controllers: [LinkController, LinkUsersController],
  providers: [
    {
      provide: LinkGateway,
      useClass: LinkDsMapper,
    },
    {
      provide: LinkUserGateway,
      useClass: LinkUserDsMapper,
    },
    {
      provide: VerifyLinkUserUsecase,
      useClass: VerifyLinkUserInteractor,
    },
  ],
  exports: [VerifyLinkUserUsecase],
})
export class LinkModule {}