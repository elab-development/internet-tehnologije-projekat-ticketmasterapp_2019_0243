import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { EventService } from "./events.service";
import { JwtAuthGuard } from "src/auth/auth.guard";

@Controller("users")
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @UseGuards(JwtAuthGuard)
    @Get()
    getAllEvents() {
      return this.eventsService.getAllEvents();
    }

//   @Post()
//   create(@Body() registerUserDto: RegisterUserDto) {
//     return this.usersService.registerUser(registerUserDto);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get()
//   findAll() {
//     return this.usersService.findAll();
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get(":id")
//   findOne(@Param("id") id: string) {
//     return this.usersService.findOne(+id);
//   }


//   @UseGuards(JwtAuthGuard)
//   @Delete(":id")
//   remove(@Param("id") id: string) {
//     return this.usersService.remove(+id);
//   }
}
