import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Priority } from "../enums/ticket.enums";

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @IsOptional()
  assigned_to?: number;
}
