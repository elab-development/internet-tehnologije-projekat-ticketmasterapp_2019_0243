import { Module,forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { TicketModule } from "src/ticket/ticket.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]),  forwardRef(() => TicketModule),],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
