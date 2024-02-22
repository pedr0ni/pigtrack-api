import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreatePacketDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
