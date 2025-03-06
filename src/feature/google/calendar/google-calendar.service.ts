import { Injectable } from "@nestjs/common";
import { OAuthProvider } from "src/feature/user/domain/model/user-oauth.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { FindUserUsecase } from "src/feature/user/usecase/find-user/find-user.usecase";
import { Inject } from "@nestjs/common";

@Injectable()
export class GoogleCalendarService {
  constructor(
    @Inject(FindUserUsecase)
    private readonly findUserUsecase: FindUserUsecase,
  ) {}

  async getEvents(userId: number) {
    const user = await this.findUserUsecase.findByIdWithOAuthsOrNull(userId);
    if (!user) throw new Error('User not found');

    const googleOAuth = user.getOAuth(OAuthProvider.GOOGLE);
    if (!googleOAuth) { // expired or not found
      throw new Error('Valid Google OAuth token required');
    }

    return await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: { Authorization: `Bearer ${googleOAuth.accessToken}` }
      }
    ).then(res => res.json());
  }

  async createEvent(userId: number, event: CreateEventDto) {
    const user = await this.findUserUsecase.findByIdWithOAuthsOrNull(userId);
    if (!user) throw new Error('User not found');

    const googleOAuth = user.getOAuth(OAuthProvider.GOOGLE);
    if (!googleOAuth || googleOAuth.isExpired()) {
      throw new Error('Valid Google OAuth token required');
    }
    
    return await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${user.getOAuth(OAuthProvider.GOOGLE)!.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      }
    ).then(res => res.json());
  }
}
