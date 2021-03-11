import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class NoticeResolver {
  @Query(() => Boolean)
  isPizzaGood(): boolean {
    return true;
  }
}
