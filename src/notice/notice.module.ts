import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { NoticeResolver } from './notice.resolver';

// Mongoose
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

// Model
import { Notice, NoticeSchema } from './schemas/notice.schema';
@Module({
  providers: [NoticeService, NoticeResolver],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Notice.name,
        useFactory: (connection: Connection) => {
          const schema = NoticeSchema;
          const AutoIncrement = AutoIncrementFactory(connection);

          schema.plugin(AutoIncrement, { inc_field: 'no' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  exports: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
