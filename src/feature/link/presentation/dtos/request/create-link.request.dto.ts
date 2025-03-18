import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLinkRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  password?: string

  @IsString()
  @IsOptional()
  coverImageUrl?: string

  @IsString()
  @IsNotEmpty()
  nickname: string
}