import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
 
  @Field()
  @IsNotEmpty()
  firstName:string
  

  @Field()
  @IsNotEmpty()
  lastName:string

  @Field()
  @IsNotEmpty()
  email:string


  @Field()
  @IsNotEmpty()
  password:string
}
