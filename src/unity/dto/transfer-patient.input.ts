import { Field, Int, InputType } from "@nestjs/graphql";

@InputType()
export class TransferPatientInput {
  @Field(() => Int)
  patientId: number;

  @Field(() => Int)
  targetDepartmentId: number;

  @Field(() => Int)
  targetUnityId: number;
}
