import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "./dto/CreateEventDto";
import { Event } from "./entities/events.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) {}

  async getAllEvents() {
    const events = await this.eventRepository.findAndCount();
    return events;
  }

  async createEvent(eventData: CreateEventDto) {
    try {
      const { date, name } = eventData;

      const event = this.eventRepository.create({ name, date });
      await this.eventRepository.save(event);
    } catch (error) {
      console.log(error);
    }
  }

  async getEventDetails(id: number) {
    const existingEvent = await this.eventRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingEvent) throw new BadRequestException("Event not found");

    return existingEvent;
  }
}
