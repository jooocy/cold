import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested, IsArray } from "class-validator";
import { OAuthProvider } from "src/feature/user/domain/model/user-oauth.entity";

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

export class CreateUserWithOAuthUsecaseDto extends CreateUserUsecaseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OAuthUsecaseDto)
  oauths: OAuthUsecaseDto[];
}

export class OAuthUsecaseDto {
  @IsString()
  @IsNotEmpty()
  provider: OAuthProvider;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @Type(() => Date)
  @IsNotEmpty()
  expiresAt: Date;
}


