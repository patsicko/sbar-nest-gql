// create-handover.input.ts
import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateHandoverInput {
  @Field(() => Int)
  fromStaffId: number;

  @Field(() => Int)
  toStaffId: number;

  @Field()
  handoverDetails: string;
}
