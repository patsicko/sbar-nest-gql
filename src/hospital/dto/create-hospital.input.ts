import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHospitalInput {
 
  @Field(() => Int, { description: 'Hospital Id' })
  hospitalId: number;


  @Field()
  hospitalName:string;


  @Field()
  district:string

}
