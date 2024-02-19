import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './entities/user.entity';
import {PacketModule} from '../packet/packet.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PacketModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
