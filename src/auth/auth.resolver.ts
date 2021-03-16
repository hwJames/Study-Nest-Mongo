import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

// Model
import { User } from 'src/user/entities/user.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
}
