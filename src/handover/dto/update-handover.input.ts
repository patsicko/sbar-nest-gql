import { CreateHandoverInput } from "./create-handover.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class ApproveHandoverInput extends PartialType(CreateHandoverInput) {
  @Field(() => Int)
  id: number;
   
  @Field()
  receiptSignature:boolean=true

}
