import { CreateHandoverInput } from "./create-handover.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateHandoverInput extends PartialType(CreateHandoverInput) {
  @Field(() => Int)
  id: number;
}
