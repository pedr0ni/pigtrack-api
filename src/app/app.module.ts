import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PacketModule} from './packet/packet.module';
import {UserModule} from './user/user.module';
import {ConfigModule} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from 'src/infra/auth/auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/pigtrack'),
    UserModule,
    PacketModule,
    PassportModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
