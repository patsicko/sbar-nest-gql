// create-handover.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateHandoverInput {
  @Field(() => Int)
  unityId: number;

  @Field(() => Int)
  fromStaffId: number;

  @Field(() => Int)
  toStaffId: number;

  @Field(() => [Int], { nullable: true })
  sbarIds?: number[];

  @Field()
  handoverDetails: string;

  @Field({ nullable: true })
  receiptSignature?: boolean;
}
