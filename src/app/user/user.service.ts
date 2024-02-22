import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './entities/user.entity';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {LoginDto} from './dto/login.dto';
import {PacketService} from '../packet/packet.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly packetService: PacketService,
    private readonly jwtService: JwtService
  ) {}

  findAll() {
    return this.userModel.find();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User not found: ${id}`);
    }

    return user;
  }

  async getPackets(id: string) {
    await this.findById(id);

    const packets = await this.packetService.getUserPackets(id);

    return packets;
  }

  async create(body: CreateUserDto) {
    const password = await bcrypt.hash(body.password, 10);
    return this.userModel.create({
      ...body,
      password,
    });
  }

  async login(body: LoginDto) {
    const user = await this.userModel.findOne({email: body.email});

    if (!user) {
      throw new NotFoundException('Esse usuário não existe.');
    }

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('E-mail ou senha incorreto(s)...');
    }

    return {
      ...user.toObject(),
      accessToken: this.jwtService.sign(user.toObject()),
    };
  }
}
