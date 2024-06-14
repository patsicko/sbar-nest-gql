// src/auth/auth.resolver.ts

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { LoginResponse } from './dto/login.response';
import { LoginInput } from './dto/login.input';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<LoginResponse> {
    const user = await this.authService.validateUser(loginInput.email, loginInput.password);
    return this.authService.login(user);
  }
}
