import { Module } from "@nestjs/common";
import { PrismaModule } from "src/core/db/prisma.module";
import { UserModule } from "../user/user.module";
import { GoogleCalendarService } from "./calendar/google-calendar.service";
import { GoogleCalendarController } from "./calendar/google-calendar.controller";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [GoogleCalendarController],
  providers: [GoogleCalendarService],
  exports: [],
})
export class GoogleModule {}
