import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
 
  @Field()
  firstName:string
  

  @Field()
  lastName:string

  @Field()
  email:string

  @Field({nullable:true})
  password?: string;

}
