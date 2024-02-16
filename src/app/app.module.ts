import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PacketModule} from './packet/packet.module';
import {UserModule} from './user/user.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/pigtrack'),
    UserModule,
    PacketModule,
  ],
})
export class AppModule {}
