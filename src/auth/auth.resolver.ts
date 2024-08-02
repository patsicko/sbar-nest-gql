import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "../user/entities/user.entity";
import { LoginResponse } from "./dto/login.response";
import { LoginInput } from "./dto/login.input";
import { Response } from "express";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args("loginInput") loginInput: LoginInput,
    @Context() context: { res: Response }
  ): Promise<LoginResponse> {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password
    );
    const { accessToken } = await this.authService.login(user);

    context.res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",    
      secure: true,         
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }
}
