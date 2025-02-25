import { Module } from "@nestjs/common";
import { PrismaModule } from "src/core/db/prisma.module";
import { LinkUsersController } from "./presentation/link-users.controller";

@Module({
  imports: [PrismaModule],
  controllers: [LinkUsersController],
})
export class LinkUsersModule {}
