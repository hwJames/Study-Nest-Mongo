import { IsNotEmpty, IsString, IsInt, IsDate } from 'class-validator';

export class CreateCustomerDto {
  @IsInt()
  @IsNotEmpty()
  readonly no: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsDate()
  @IsNotEmpty()
  readonly registDate: Date;

  @IsDate()
  @IsNotEmpty()
  readonly updateDate: Date;
}
