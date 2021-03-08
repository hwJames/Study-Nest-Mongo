import { Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class NoticeResolver {
  @Query()
  async getAll() {
    return [
      {
        id: '1',
        name: 'Peter',
        age: 36,
      },
      {
        id: '2',
        name: 'Grace',
        age: 34,
      },
    ];
  }
}
