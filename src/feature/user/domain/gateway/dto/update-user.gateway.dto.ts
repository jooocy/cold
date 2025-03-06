import { Type } from "class-transformer";
import { OAuthProvider } from "../../model/user-oauth.entity";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserGatewayDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsEnum(OAuthProvider)
  @IsNotEmpty()
  provider: OAuthProvider;

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @Type(() => Date)
  @IsOptional()
  expiresAt?: Date;
}
