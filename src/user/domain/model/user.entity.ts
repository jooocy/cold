export class UserEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  isEmailVerified: boolean;
  nickname: string;
  profileImageUrl?: string;
  phoneNumber?: string;
  isPhoneNumberVerified?: boolean;
}