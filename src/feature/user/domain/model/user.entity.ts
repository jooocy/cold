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
}