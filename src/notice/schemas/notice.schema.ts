import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeDocument = Notice & Document;

@Schema()
export class Notice {
  @Prop({ unique: true, index: true })
  no: number;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  registDate: Date;

  @Prop()
  updateDate: Date;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
