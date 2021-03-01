import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice, NoticeDocument } from './schemas/notice.schema';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name)
    private readonly noticeModel: Model<NoticeDocument>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<NoticeDocument[]> {
    const { limit, offset } = paginationQuery;

    return await this.noticeModel.find().skip(offset).limit(limit).exec();
  }

  public async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const newNotice = await new this.noticeModel(createNoticeDto);
    return newNotice.save();
  }
}
