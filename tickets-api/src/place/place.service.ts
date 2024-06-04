import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Place } from "./entities/place.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlaceService {
  @InjectRepository(Place)
  private readonly placeRepository: Repository<Place>;
  async create(createPlaceDto: CreatePlaceDto) {
    try {
      const { city, country, name } = createPlaceDto;

      const newPlace = this.placeRepository.create({
        city,
        country,
        name,
      });

      return await this.placeRepository.save(newPlace);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try{
      return await this.findAll()
    }
    catch(error){
      console.log(error)
    }
  }

  async findOne(id: number) {
    try {
      const foundPlace = await this.placeRepository.findOne({
        where: {
          id,
        },
      });

      if (!foundPlace) throw new NotFoundException("Place doesnt exists");

      return foundPlace;
    } catch (error) {
      console.log(error);
    }
  }

  async update(updatePlaceDto: UpdatePlaceDto) {
    try {
      const { city, country, name, id } = updatePlaceDto;

      const foundPlace = await this.findOne(id);

      foundPlace.city = city;
      foundPlace.country = country;
      foundPlace.name = name;

      this.placeRepository.save(foundPlace);
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
