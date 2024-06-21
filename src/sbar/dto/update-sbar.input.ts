// update-sbar.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSbarInput } from './create-sbar.input';

@InputType()
export class UpdateSbarInput extends PartialType(CreateSbarInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  updatedById?: number;
}
