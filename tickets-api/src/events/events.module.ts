import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventController } from "./events.controller";
import { EventService } from "./events.service";
import { Event } from "./entities/events.entity";
import { PlaceModule } from "src/place/place.module";

@Module({
  imports: [TypeOrmModule.forFeature([Event]),forwardRef(()=>PlaceModule)],
  controllers: [EventController],
  providers: [EventService,Event],
  exports: [EventService],
})
export class EventModule {}