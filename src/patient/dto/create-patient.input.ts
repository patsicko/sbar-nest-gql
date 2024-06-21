// create-patient.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePatientInput {
  @Field()
  name: string;

  @Field(() => Int)
  unityId: number;
}
