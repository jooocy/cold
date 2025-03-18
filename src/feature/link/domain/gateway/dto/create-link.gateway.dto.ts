import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUrl, Length, ValidateNested } from "class-validator";

export class CreateLinkGatewayDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  @Length(4,4)
  password?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsUrl()
  coverImageUrl?: string

  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsString()
  @IsNotEmpty()
  nickname: string
}
