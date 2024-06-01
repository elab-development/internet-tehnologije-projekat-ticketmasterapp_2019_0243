import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { RefreshToken } from "src/auth/entities/refresh-token.entity";
import { Event } from "src/events/entities/events.entity";
import { Place } from "src/place/entities/place.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";
import { User } from "src/users/entities/user.entity";

export function typeOrmConfigFactory(): TypeOrmModuleOptions {
  return {
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "dev",
    password: "dev",
    database: "ticket-db",
    entities: [User,Event,Place,Ticket,RefreshToken],
    synchronize: true,
    migrationsRun: false,
    migrations: [join(__dirname, "migrations/**/*{.ts,.js}")],
    logging: true,
  };
}
