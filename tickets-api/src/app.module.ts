import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfigFactory } from "typeorm.config";
import { AuthModule } from './auth/auth.module';
import { EventModule } from "./events/events.module";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfigFactory,
    }),
    AuthModule,
    EventModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
