import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Int, { description: '회원 번호 (자동 생성)' })
  @Prop({ unique: true, index: true })
  us_no?: number;

  @Field(() => String, { description: '회원 아이디(이메일)' })
  @Prop({ unique: true, index: true })
  us_id: string;

  @Field(() => String, { description: '회원 비밀번호' })
  @Prop()
  us_pwd: string;

  @Field(() => String, { description: '회원 닉네임' })
  @Prop()
  us_nick: string;

  @Field(() => GraphQLISODateTime, { description: '회원 가입일' })
  @Prop()
  us_regist: Date;

  @Field(() => GraphQLISODateTime, { description: '회원 업뎃일' })
  @Prop()
  us_update: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
