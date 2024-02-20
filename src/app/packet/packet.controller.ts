import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CreatePacketDto} from './dto/create-packet.dto';
import {PacketService} from './packet.service';
import {RefreshAllDto} from './dto/refresh-all.dto';

@Controller('packet')
@ApiTags('packet')
export class PacketController {
  constructor(private readonly packetService: PacketService) {}

  @Post()
  createPacket(@Body() body: CreatePacketDto) {
    return this.packetService.create(body);
  }

  @Get()
  findAll() {
    return this.packetService.findAll();
  }

  @Post(':id/refresh')
  refreshPacket(@Param('id') id: string) {
    return this.packetService.refresh(id);
  }

  @Post('/refresh-all')
  refreshAllPackets(@Body() body: RefreshAllDto) {
    return this.packetService.refreshAll(body);
  }
}
