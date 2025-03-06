import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean, ValidateNested, IsArray } from "class-validator";

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

export class CreateUserWithOAuthGatewayDto extends CreateUserGatewayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOAuthDto)
  oauths: CreateOAuthDto[];
}

export class CreateOAuthDto {
  @IsString()
  @IsNotEmpty()
  provider: string;
  
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