import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class AssignDepartmentInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  departmentId: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  unityId: number;
}
