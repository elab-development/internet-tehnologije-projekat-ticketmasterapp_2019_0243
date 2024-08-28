import { Module ,forwardRef} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from 'src/events/events.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Ticket]),forwardRef(()=>EventModule), forwardRef(()=>UsersModule)],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
