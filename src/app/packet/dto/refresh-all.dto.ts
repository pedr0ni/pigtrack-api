import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class RefreshAllDto {
  @ApiProperty({type: String, isArray: true})
  @IsString({each: true})
  @IsNotEmpty()
  packets: string[];
}
