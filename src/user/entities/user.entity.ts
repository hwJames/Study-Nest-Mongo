import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Int, { description: '회원 번호' })
  no: number;

  @Field(() => String, { description: '회원 아이디(이메일)' })
  id: string;

  @Field(() => String, { description: '회원 비밀번호' })
  pwd: string;

  @Field(() => String, { description: '회원 닉네임' })
  nick: string;

  @Field(() => GraphQLISODateTime, { description: '회원 가입일' })
  regist: Date;

  @Field(() => GraphQLISODateTime, { description: '회원 업뎃일' })
  update: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
