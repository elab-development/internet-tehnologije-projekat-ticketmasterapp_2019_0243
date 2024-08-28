import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './create-place.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {
    @IsNumber()
    id:number

    @IsString()
    name:string
   
    @IsString()
    city:string
   
    @IsString()
    country:string
}
