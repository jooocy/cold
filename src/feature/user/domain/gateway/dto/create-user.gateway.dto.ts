import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean } from "class-validator";

export class CreateUserGatewayDto {
  @Type(() => Date)
  @IsNotEmpty()
  lastSignedInAt: Date;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsOptional()
  profileImageUrl?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  isEmailVerified: boolean;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  isPhoneNumberVerified?: boolean;
}
