// dto/create-hospital-with-admin.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateHospitalWithAdminInput {
  @Field()
  @IsNotEmpty()
  hospitalName: string;

  @Field()
  @IsNotEmpty()
  district: string;

  @Field()
  @IsNotEmpty()
  sector: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @ IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
