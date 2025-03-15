import { Controller, Get, UseGuards, Post, Body, Query } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { GoogleCalendarService } from "./google-calendar.service";
import { JwtAuthGuard } from "src/common/jwt/jwt-guard";
import { CurrentUser } from "src/feature/user/decorator/current-user.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller('google/calendar')
export class GoogleCalendarController {
  constructor(
    private readonly googleCalendarService: GoogleCalendarService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('events')
  async getEvents(
    @CurrentUser() user: CurrentUser,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    console.log(startDate, endDate);
    return await this.googleCalendarService.getEvents(user.id, startDate, endDate);
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