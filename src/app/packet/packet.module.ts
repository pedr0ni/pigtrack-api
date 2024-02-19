import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Packet, PacketSchema} from './entities/packet.entity';
import {PacketController} from './packet.controller';
import {PacketService} from './packet.service';
import {CorreiosModule} from 'src/infra/correios/correios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Packet.name, schema: PacketSchema}]),
    CorreiosModule,
  ],
  controllers: [PacketController],
  providers: [PacketService],
  exports: [PacketService],
})
export class PacketModule {}
