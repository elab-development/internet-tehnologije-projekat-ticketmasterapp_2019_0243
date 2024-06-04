import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { EventService } from "src/events/events.service";
import { Repository } from "typeorm";
import { Ticket } from "./entities/ticket.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";

@Injectable()
export class TicketService {
  constructor(
    @Inject(forwardRef(() => EventService)) private readonly eventService: EventService,
    @Inject(forwardRef(() => UsersService)) private readonly userService: UsersService,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      const { eventId, type, userId } = createTicketDto;
      const user = await this.userService.findOne(userId);
      const event = await this.eventService.findEventById(eventId);

      const tickets: Ticket[] = [];

      for (let i = 0; i < createTicketDto.quantity; i++) {
        const ticket = new Ticket();
        ticket.type = type;
        ticket.user = user;
        ticket.event = event;
        tickets.push(ticket);
      }

      return this.ticketRepository.save(tickets);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.ticketRepository.find({
        select: {
          event: {
            id: true,
            date: true,
            name: true,
            place: {
              name: true,
            },
          },
          user: {
            firstName: true,
            surname: true,
            role: {
              name: true,
            },
          },
        },
        relations: {
          user: true,
          event: true,
        },
      });
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(id: number) {
    try {
      return await this.ticketRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
          event: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
