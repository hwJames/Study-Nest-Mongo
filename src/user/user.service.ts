import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Model
import { User, UserDocument } from './entities/user.entity';

// DTO
import { PaginationQueryInput } from '../dto/pagination-query.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = await new this.userModel(createUserInput);
    return user.save();
  }

  async findAll(paginationQuery: PaginationQueryInput) {
    const { limit, offset } = paginationQuery;
    const user = await this.userModel.find().skip(offset).limit(limit).exec();

    if (!user) {
      throw new NotFoundException(`Users not found`);
    }

    return user;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserInput);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndRemove(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }
}
