import { Injectable } from "@nestjs/common";
import { OAuthProvider } from "src/feature/user/domain/model/user-oauth.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { FindUserUsecase } from "src/feature/user/usecase/find-user/find-user.usecase";
import { Inject } from "@nestjs/common";

@Injectable()
export class GoogleCalendarService {
  private readonly GOOGLE_CALENDAR_API_URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  constructor(
    @Inject(FindUserUsecase)
    private readonly findUserUsecase: FindUserUsecase,
  ) {}

  async getEvents(userId: number, startDate?: string, endDate?: string) {
    const user = await this.findUserUsecase.findByIdWithOAuthsOrNull(userId);
    if (!user) throw new Error('User not found');

    const googleOAuth = user.getOAuth(OAuthProvider.GOOGLE);
    if (!googleOAuth) throw new Error('Valid Google OAuth token required');

    const params = new URLSearchParams();
    if (startDate) params.append('timeMin', new Date(startDate).toISOString());
    if (endDate) params.append('timeMax', new Date(endDate).toISOString());

    const url = `${this.GOOGLE_CALENDAR_API_URL}${params.toString() ? `?${params.toString()}` : ''}`;
    
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${googleOAuth.accessToken}` }
      });
      
      const data = await response.json();
      
      // Google Calendar API 응답을 단순화된 형태로 변환
      return {
        items: data.items?.map(event => ({
          id: event.id,
          summary: event.summary,
          description: event.description,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
        })) || []
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch events');
    }
  }

  async createEvent(userId: number, event: CreateEventDto) {
    const user = await this.findUserUsecase.findByIdWithOAuthsOrNull(userId);
    if (!user) throw new Error('User not found');

    const googleOAuth = user.getOAuth(OAuthProvider.GOOGLE);
    if (!googleOAuth || googleOAuth.isExpired()) {
      throw new Error('Valid Google OAuth token required');
    }
    
    return await fetch(
      this.GOOGLE_CALENDAR_API_URL,
      {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${googleOAuth.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      }
    ).then(res => res.json());
  }
}
