// create-patient.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePatientInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  unityId: number;
}
