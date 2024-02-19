import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({_id: false, versionKey: false})
export class PacketHistory {
  @Prop()
  date: Date;

  @Prop()
  location: string;

  @Prop()
  status: string;
}

export const PacketHistorySchema = SchemaFactory.createForClass(PacketHistory);
