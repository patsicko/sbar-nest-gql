// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    console.log("this is a user got when validating",user)
    if (!user) {
      console.log(`User with email ${email} not found`)
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`User with email ${email} not found`)
      throw new UnauthorizedException('Invalid credentials');
    }
  console.log("user got",user)
    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const userPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      approved:user.approved
      
    };
    return {
      accessToken: this.jwtService.sign({...userPayload}),
    };
  }
}
