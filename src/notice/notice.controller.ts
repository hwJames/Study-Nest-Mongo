import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { NoticeService } from './notice.service';

// DTO
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
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
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: notice not created!',
        status: 400,
      });
    }
  }

  @Get('/:no')
  public async getNotice(@Res() res, @Param('no') no: number) {
    const notice = await this.noticeService.findOne(no);
    if (!notice) {
      throw new NotFoundException('Notice does not exist!');
    }
    return res.status(HttpStatus.OK).json(notice);
  }

  @Put('/:no')
  public async updateNotice(
    @Res() res,
    @Param('no') no: number,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    try {
      const notice = await this.noticeService.update(no, updateNoticeDto);
      if (!notice) {
        throw new NotFoundException('Notice does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'does has been successfully updated',
        notice,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: does not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:no')
  public async deleteNotice(@Res() res, @Param('no') no: number) {
    if (!no) {
      throw new NotFoundException('Notice no does not exist');
    }

    const notice = await this.noticeService.remove(no);

    if (!notice) {
      throw new NotFoundException('Notice does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Notice has been deleted',
      notice,
    });
  }
}
