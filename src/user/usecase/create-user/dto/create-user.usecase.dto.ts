import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator";
import { IsOptional } from "class-validator";
import { IsString } from "class-validator";

export class CreateUserUsecaseDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsOptional()
  profileImageUrl?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  isEmailVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  isPhoneNumberVerified?: boolean;
}
