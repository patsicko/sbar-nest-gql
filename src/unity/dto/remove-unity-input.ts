import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class RemoveUnitResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}
