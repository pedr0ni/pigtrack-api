import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, now} from 'mongoose';

export type PacketDocument = HydratedDocument<Packet>;

@Schema({versionKey: false, timestamps: true})
export class Packet {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop({default: now()})
  createdAt: Date;

  @Prop({default: now()})
  updatedAt: Date;
}

export const PacketSchema = SchemaFactory.createForClass(Packet);
