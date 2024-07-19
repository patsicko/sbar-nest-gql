import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SbarService } from "./sbar.service";
import { Sbar } from "./entities/sbar.entity";
import { CreateSbarInput } from "./dto/create-sbar.input";
import { UpdateSbarInput } from "./dto/update-sbar.input";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/user/entities/user.entity";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Resolver(() => Sbar)
export class SbarResolver {
  constructor(private readonly sbarService: SbarService) {}

  @Mutation(() => Sbar)
  @UseGuards(JwtAuthGuard)
  createSbar(
    @Args("createSbarInput") createSbarInput: CreateSbarInput,
    @CurrentUser() currentUser: User
  ) {
    return this.sbarService.create(createSbarInput, currentUser);
  }

  @Query(() => [Sbar], { name: "getSbars" })
  findAll() {
    return this.sbarService.findAll();
  }

  @Query(() => [Sbar], { name: "findSbarsByPatient" })
  async findSbarsByPatient(
    @Args("patientId", { type: () => Int }) patientId: number
  ) {
    const sbars = await this.sbarService.findSbarsByPatient(patientId);

    // Format createdAt field for each SBAR entry
    sbars.forEach((sbar) => {
      sbar.createdAt = sbar.createdAt.toLocaleString(); // Example formatting, adjust as per your needs
    });

    return sbars;
  }

  @Query(() => Sbar, { name: "getSbar" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.sbarService.findOne(id);
  }

  @Mutation(() => Sbar)
  updateSbar(@Args("updateSbarInput") updateSbarInput: UpdateSbarInput) {
    return this.sbarService.update(updateSbarInput.id, updateSbarInput);
  }

  @Mutation(() => Sbar)
  removeSbar(@Args("id", { type: () => Int }) id: number) {
    return this.sbarService.remove(id);
  }
}
