import { CreateUnityInput } from './create-unity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUnityInput extends PartialType(CreateUnityInput) {
  @Field(() => Int)
  id: number;
}
