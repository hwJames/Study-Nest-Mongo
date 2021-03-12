import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  no: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  pwd: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  nick: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  regist: Date;

  @Field()
  @IsDate()
  @IsNotEmpty()
  update: Date;
}
