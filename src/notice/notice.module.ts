import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { Notice, NoticeSchema } from './schemas/notice.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';

@Module({
  providers: [NoticeService],
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
