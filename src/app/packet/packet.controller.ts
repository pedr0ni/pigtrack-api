import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CreatePacketDto} from './dto/create-packet.dto';
import {PacketService} from './packet.service';
import {RefreshAllDto} from './dto/refresh-all.dto';
import {JwtAuthGuard} from 'src/infra/auth/auth.guard';
import {AuthUser} from 'src/infra/auth/auth-user.decorator';
import {User} from '../user/entities/user.entity';

@Controller('packet')
@ApiTags('packet')
export class PacketController {
  constructor(private readonly packetService: PacketService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  createPacket(@Body() body: CreatePacketDto, @AuthUser() user: User) {
    return this.packetService.create(body, user);
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
