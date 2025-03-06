import { Controller, Get, UseGuards, Post, Body } from "@nestjs/common";
import { UserEntity } from "src/feature/user/domain/model/user.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { GoogleCalendarService } from "./google-calendar.service";
import { JwtAuthGuard } from "src/common/jwt/jwt-guard";
import { CurrentUser } from "src/feature/user/decorator/current-user.decorator";
@Controller('google/calendar')
export class GoogleCalendarController {
  constructor(
    private readonly googleCalendarService: GoogleCalendarService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('events')
  async getEvents(@CurrentUser() user: CurrentUser) {
    return await this.googleCalendarService.getEvents(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('events')
  async createEvent(
    @CurrentUser() user: CurrentUser,
    @Body() event: CreateEventDto,
  ) {
    return await this.googleCalendarService.createEvent(user.id, event);
  }
}