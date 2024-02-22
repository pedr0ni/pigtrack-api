import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './entities/user.entity';
import {PacketModule} from '../packet/packet.module';
import {JwtModule} from '@nestjs/jwt';
import jwtConstants from 'src/infra/jwt.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1h'},
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PacketModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
