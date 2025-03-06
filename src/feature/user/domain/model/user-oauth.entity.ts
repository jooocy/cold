export class UserOAuthEntity {
  provider: OAuthProvider;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  
  isExpired(): boolean {
    return this.expiresAt < new Date();
  }
}

export enum OAuthProvider {
  GOOGLE = 'GOOGLE',
}