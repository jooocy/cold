import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsNotEmpty()
  start: Date;

  @Type(() => Date)
  @IsNotEmpty()
  end: Date;
}
