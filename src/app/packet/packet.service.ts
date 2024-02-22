import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePacketDto} from './dto/create-packet.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Packet} from './entities/packet.entity';
import {Model} from 'mongoose';
import {CorreiosService} from 'src/infra/correios/correios.service';
import {RefreshAllDto} from './dto/refresh-all.dto';
import {User} from '../user/entities/user.entity';

@Injectable()
export class PacketService {
  constructor(
    @InjectModel(Packet.name) private readonly packetModel: Model<Packet>,
    private readonly correiosService: CorreiosService
  ) {}

  async create(body: CreatePacketDto, user: User) {
    const history = await this.correiosService.fetchHistory(body.code);
    return this.packetModel.create({...body, history, user: user._id});
  }

  findAll() {
    return this.packetModel.find();
  }

  async findById(id: string) {
    const packet = await this.packetModel.findById(id);

    if (!packet) {
      throw new NotFoundException(`Packet not found: ${id}`);
    }

    return packet;
  }

  async getUserPackets(userId: string) {
    return this.packetModel.find({user: userId});
  }

  async refresh(id: string) {
    const packet = await this.findById(id);

    const history = await this.correiosService.fetchHistory(packet.code);

    packet.history = history;

    return packet.save();
  }

  async refreshAll(body: RefreshAllDto) {
    const packets = await this.packetModel.find({_id: {$in: body.packets}});

    for (const packet of packets) {
      const history = await this.correiosService.fetchHistory(packet.code);

      packet.history = history;

      await packet.save();
    }

    return packets;
  }
}
