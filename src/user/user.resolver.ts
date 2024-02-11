import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'allUsers',nullable:true })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'Getuser',nullable:true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @Args('id',{type:()=>Int}) id: number) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(()=>User,{nullable:true})
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    const removedUser= await  this.userService.remove(id);
    return removedUser;
  }
}
