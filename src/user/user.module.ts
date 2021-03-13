import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Model
import { User, UserSchema } from './entities/user.entity';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}
