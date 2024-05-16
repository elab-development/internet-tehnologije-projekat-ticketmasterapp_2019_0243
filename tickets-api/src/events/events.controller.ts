import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { EventService } from "./events.service";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { CreateEventDto } from "./dto/CreateEventDto";

@Controller("users")
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @UseGuards(JwtAuthGuard)
    @Get()
    getAllEvents() {
      return this.eventsService.getAllEvents();
    }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() eventData: CreateEventDto) {
    return this.eventsService.createEvent(eventData);
  }


  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventsService.getEventDetails(+id);
  }


//   @UseGuards(JwtAuthGuard)
//   @Delete(":id")
//   remove(@Param("id") id: string) {
//     return this.usersService.remove(+id);
//   }
}
