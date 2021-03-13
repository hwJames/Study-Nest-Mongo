import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Model
import { Notice, NoticeDocument } from './schemas/notice.schema';

// DTO
import { PaginationQueryInput } from '../dto/pagination-query.input';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name)
    private readonly noticeModel: Model<NoticeDocument>,
  ) {}

  public async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const newNotice = await new this.noticeModel(createNoticeDto);
    return newNotice.save();
  }

  public async findAll(
    paginationQuery: PaginationQueryInput,
  ): Promise<NoticeDocument[]> {
    const { limit, offset } = paginationQuery;

    return await this.noticeModel.find().skip(offset).limit(limit).exec();
  }

  public async findOne(no: number): Promise<NoticeDocument> {
    const notice = await this.noticeModel.findOne({ no: no }).exec();

    if (!notice) {
      throw new NotFoundException(`Notice #${no} not found`);
    }

    return notice;
  }

  public async update(
    no: number,
    UpdateNoticeDto: UpdateNoticeDto,
  ): Promise<NoticeDocument> {
    const existingCustomer = await this.noticeModel.findOneAndUpdate(
      { no: no },
      UpdateNoticeDto,
    );

    if (!existingCustomer) {
      throw new NotFoundException(`Notice #${no} not found`);
    }

    return existingCustomer;
  }

  public async remove(no: number): Promise<any> {
    const deletedCustomer = await this.noticeModel.findOneAndRemove({
      no: no,
    });
    return deletedCustomer;
  }
}
