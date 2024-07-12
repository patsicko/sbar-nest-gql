// create-unity.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUnityInput {
  @Field()
  name: string;

  @Field(() => Int)
  departmentId: number;
}
