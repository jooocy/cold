import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateQuestionGatewayDto{
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  authorId?: number;

  @IsNumber()
  @IsNotEmpty()
  linkId: number;
}
