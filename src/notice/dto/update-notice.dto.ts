import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-notice.dto';

export class UpdateNoticeDTO extends PartialType(CreateCustomerDto) {}
