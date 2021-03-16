import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: process.env.DB_HOST,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
}));
