import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { HandoverService } from "./handover.service";
import { Handover } from "./entities/handover.entity";
import { CreateHandoverInput } from "./dto/create-handover.input";
import { ApproveHandoverInput,  } from "./dto/update-handover.input";

@Resolver(() => Handover)
export class HandoverResolver {
  constructor(private readonly handoverService: HandoverService) {}

  @Mutation(() => Handover)
  createHandover(
    @Args("createHandoverInput") createHandoverInput: CreateHandoverInput
  ) {
    return this.handoverService.create(createHandoverInput);
  }

  @Query(() => [Handover], { name: "getHandovers" })
  findAll() {
    return this.handoverService.findAll();
  }

  @Query(() => Handover, { name: "getHandover" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.handoverService.findOne(id);
  }

  @Mutation(() => Handover)
  approveHandover(
    @Args("approveHandoverInput") approveHandoverInput: ApproveHandoverInput
  ) {
    return this.handoverService.approve(
      approveHandoverInput.id,
      approveHandoverInput
    );
  }

  @Mutation(() => Handover)
  removeHandover(@Args("id", { type: () => Int }) id: number) {
    return this.handoverService.remove(id);
  }
}
