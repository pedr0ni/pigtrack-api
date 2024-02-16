import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './entities/user.entityt';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {LoginDto} from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

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

    return user;
  }
}
