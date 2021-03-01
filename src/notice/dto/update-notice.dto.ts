import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticeDto } from './create-notice.dto';

export class UpdateNoticeDTO extends PartialType(CreateNoticeDto) {}
