import { CreateHospitalInput } from './create-hospital.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHospitalInput extends PartialType(CreateHospitalInput) {
  @Field(() => Int)
  id: number;
}
