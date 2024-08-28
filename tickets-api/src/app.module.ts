import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfigFactory } from "typeorm.config";
import { AuthModule } from './auth/auth.module';
import { EventModule } from "./events/events.module";
import { PlaceModule } from './place/place.module';
import { TicketModule } from './ticket/ticket.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfigFactory,
    }),
    AuthModule,
    EventModule,
    PlaceModule,
    TicketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
