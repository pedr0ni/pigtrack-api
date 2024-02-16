import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePacketDto} from './dto/create-packet.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Packet} from './entities/packet.entity';
import {Model} from 'mongoose';
import {CorreiosService} from 'src/infra/correios/correios.service';

@Injectable()
export class PacketService {
  constructor(
    @InjectModel(Packet.name) private readonly packetModel: Model<Packet>,
    private readonly correiosService: CorreiosService
  ) {}

  create(body: CreatePacketDto) {
    return this.packetModel.create(body);
  }

  async findById(id: string) {
    const packet = await this.packetModel.findById(id);

    if (!packet) {
      throw new NotFoundException(`Packet not found: ${id}`);
    }

    return packet;
  }

  async refresh(id: string) {
    const packet = await this.findById(id);

    await this.correiosService.trackObject(packet.code);
  }
}
