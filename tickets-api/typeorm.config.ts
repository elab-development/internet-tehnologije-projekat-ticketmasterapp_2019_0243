import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { User } from "src/users/entities/user.entity";

export function typeOrmConfigFactory(): TypeOrmModuleOptions {
  return {
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "dev",
    password: "dev",
    database: "ticket-db",
    entities: [User,Event],
    synchronize: true,
    migrationsRun: false,
    migrations: [join(__dirname, "migrations/**/*{.ts,.js}")],
    logging: true,
  };
}
