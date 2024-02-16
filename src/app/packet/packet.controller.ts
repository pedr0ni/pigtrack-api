import {Body, Controller, Param, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CreatePacketDto} from './dto/create-packet.dto';
import {PacketService} from './packet.service';

@Controller('packet')
@ApiTags('packet')
export class PacketController {
  constructor(private readonly packetService: PacketService) {}

  @Post()
  createPacket(@Body() body: CreatePacketDto) {
    return this.packetService.create(body);
  }

  @Post(':id/refresh')
  refreshPacket(@Param('id') id: string) {
    return this.packetService.refresh(id);
  }
}
