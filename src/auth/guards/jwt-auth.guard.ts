import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

   
    const authHeader = req.headers?.authorization; 

   console.log("auth header",authHeader)

    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    console.log("token when getting user",token)

    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      console.log("decoded token",decoded)
      if(!decoded){
        throw new UnauthorizedException('Invalid token');
      }
      req.user = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
