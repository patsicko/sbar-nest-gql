import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSbarInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
