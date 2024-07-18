// create-sbar.input.ts
import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateSbarInput {
  @Field()
  situation: string;

  @Field()
  background: string;

  @Field()
  assessment: string;

  @Field()
  recommendation: string;

  @Field(() => Int)
  patientId: number;
}
