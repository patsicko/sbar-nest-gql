import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateHospitalWithAdminInput } from "./create-hospital.input";

@InputType()
export class UpdateHospitalInput extends PartialType(
  CreateHospitalWithAdminInput
) {
  @Field(() => Int)
  id: number;
}
