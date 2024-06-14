import { CreateSbarInput } from './create-sbar.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSbarInput extends PartialType(CreateSbarInput) {
  @Field(() => Int)
  id: number;
}
