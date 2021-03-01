import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { NoticeService } from './notice.service';

@Controller('api/v1/notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Get()
  public async getAllNotice(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const noticeList = await this.noticeService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(noticeList);
  }

  @Post()
  public async addNotice(@Res() res, @Body() createNoticeDto: CreateNoticeDto) {
    try {
      const notice = await this.noticeService.create(createNoticeDto);
      return res.status(HttpStatus.OK).json({
        message: 'Notice has been created successfully',
        notice,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: notice not created!',
        status: 400,
      });
    }
  }
}
