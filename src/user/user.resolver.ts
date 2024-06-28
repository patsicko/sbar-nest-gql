import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateStaffInput } from './dto/create-staff.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }


  @Mutation(() => User)
  async approveUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.approveUser(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async addStaffToHospital(
    @Args('createStaffInput') createStaffInput: CreateStaffInput,
    @CurrentUser() user: User
  ): Promise<User> {
    if(user.role!='admin'){
      throw new Error('Only admin can add staff')
    }
    const adminId = user.id; 
    return this.userService.createStaff(createStaffInput, adminId);
  }

  @Query(() => [User], { name: 'allUsers', nullable: true })
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    if (!user?.approved) {
      throw new UnauthorizedException('You need admin approval');
    }
    return this.userService.findAll(user);
  }

  @Query(() => User, { name: 'GetuserById',nullable:true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @Args('id',{type:()=>Int}) id: number) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  makeAdmin( @Args('id',{type:()=>Int}) id: number) {
    return this.userService.makeAdmin(id);
  }

  @Mutation(()=>User,{nullable:true})
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    const removedUser= await  this.userService.remove(id);
    return removedUser;
  }
}
