import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';

@InputType()
export class PaginationQueryInput {
  @Field()
  @IsOptional()
  @IsPositive()
  limit: number;

  @Field()
  @IsOptional()
  @IsPositive()
  offset: number;
}
