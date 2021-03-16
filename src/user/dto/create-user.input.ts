import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  us_id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  us_pwd: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  us_nick: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  us_regist: Date;

  @Field()
  @IsDate()
  @IsNotEmpty()
  us_update: Date;
}
