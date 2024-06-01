import { BadRequestException, Injectable, Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "./dto/CreateEventDto";
import { Event } from "./entities/events.entity";
import { UpdateEventDto } from "./dto/UpdateEventDto";
import { PlaceService } from "src/place/place.service";

@Injectable()
export class EventService {
  constructor(
    @Inject(forwardRef(() => PlaceService)) private readonly placeService: PlaceService,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) {}

  async getAllEvents() {
    try {
      const events = await this.eventRepository.find({
        relations:{place:true}
      });
      return events;
    } catch (errror) {
      console.log(errror);
    }
  }

  async createEvent(eventData: CreateEventDto) {
    try {
      const { date, name, placeId } = eventData;

      const formatedDate = new Date(date);

      const foundPlace= await this.placeService.findOne(placeId)

      const event = this.eventRepository.create({ name, date: formatedDate , place:foundPlace});
      await this.eventRepository.save(event);
    } catch (error) {
      console.log(error);
    }
  }

  async getEventDetails(id: number) {
    try {
      const existingEvent = await this.eventRepository.findOne({
        where: {
          id,
        },
      });

      if (!existingEvent) throw new BadRequestException("Event not found");

      return existingEvent;
    } catch (error) {
      console.log(error);
    }
  }

  async updateEvent(updateEventData: UpdateEventDto) {
    try {
      const { date, id, name } = updateEventData;

      const existingEvent = await this.eventRepository.findOne({
        where: { id },
      });
      if (!existingEvent) throw new BadRequestException("Event not found");

      existingEvent.date = new Date(date);
      existingEvent.name = name;

      return await this.eventRepository.save(existingEvent);
    } catch (error) {
      throw new BadRequestException("Bad req");
    }
  }

  async findEventById(id: number) {
    try {
      const existingEvent = await this.eventRepository.findOne({
        where: { id },
      });
      if (!existingEvent) throw new BadRequestException("Event not found");

      return existingEvent;
    } catch (error) {
      throw new BadRequestException("Event not found");
    }
  }

  async remove(id: number) {
    try {
      this.findEventById(id);

      const response = await this.eventRepository.softDelete({ id });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
