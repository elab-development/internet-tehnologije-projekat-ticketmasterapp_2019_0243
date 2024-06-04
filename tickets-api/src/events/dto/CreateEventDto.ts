import { IsNumber, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    name: string;
  
    @IsString()
    date: string;

    @IsNumber()
    placeId:number
  }