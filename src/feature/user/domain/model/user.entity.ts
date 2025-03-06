import { UserOAuthEntity, OAuthProvider } from "./user-oauth.entity";

export class UserEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  lastSignedInAt: Date;

  email: string;
  isEmailVerified: boolean;
  nickname: string;
  profileImageUrl?: string | null;
  phoneNumber?: string | null;
  isPhoneNumberVerified: boolean;

  oauths?: UserOAuthEntity[];

  hasValidOAuth(provider: OAuthProvider): boolean {
    return this.oauths?.some(
      oauth => oauth.provider === provider && !oauth.isExpired()
    ) ?? false;
  }

  getOAuth(provider: OAuthProvider): UserOAuthEntity | null {
    return this.oauths?.find(oauth => oauth.provider === provider) ?? null;
  }

  removeOAuth(provider: OAuthProvider): void {
    this.oauths = this.oauths?.filter(
      oauth => oauth.provider !== provider
    );
  }
}