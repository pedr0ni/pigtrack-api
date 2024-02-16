import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Packet, PacketSchema} from './entities/packet.entity';
import {PacketController} from './packet.controller';
import {PacketService} from './packet.service';
import {CorreiosService} from 'src/infra/correios/correios.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Packet.name, schema: PacketSchema}]),
  ],
  controllers: [PacketController],
  providers: [PacketService, CorreiosService],
})
export class PacketModule {}
