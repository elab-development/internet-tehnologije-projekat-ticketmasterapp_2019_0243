import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventController } from "./events.controller";
import { EventService } from "./events.service";
import { Event } from "./entities/events.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService,Event],
  exports: [EventService],
})
export class EventModule {}