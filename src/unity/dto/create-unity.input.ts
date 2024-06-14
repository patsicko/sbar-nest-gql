import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUnityInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
