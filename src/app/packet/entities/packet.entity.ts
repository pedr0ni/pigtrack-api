import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, SchemaTypes, Types, now} from 'mongoose';
import {PacketHistory, PacketHistorySchema} from './packet-history.entity';
import {User} from 'src/app/user/entities/user.entity';

export type PacketDocument = HydratedDocument<Packet>;

@Schema({versionKey: false, timestamps: true})
export class Packet {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop({type: SchemaTypes.ObjectId, ref: User.name})
  user: Types.ObjectId;

  @Prop({type: [PacketHistorySchema]})
  history: PacketHistory[];

  @Prop({default: now()})
  createdAt: Date;

  @Prop({default: now()})
  updatedAt: Date;
}

export const PacketSchema = SchemaFactory.createForClass(Packet);
