import { Module,forwardRef } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { EventModule } from 'src/events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Place]),forwardRef(()=>EventModule)],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports:[PlaceService]
})
export class PlaceModule {}
