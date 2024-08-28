import { IsEnum, IsInt, Min, IsNumber } from "class-validator";
import { TicketType } from "../enums/enum";

export class CreateTicketDto {
  @IsEnum(TicketType)
  type: TicketType;

  @IsNumber()
  userId: number;

  @IsNumber()
  eventId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
