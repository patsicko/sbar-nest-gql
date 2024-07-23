import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UnityService } from "./unity.service";
import { Unity } from "./entities/unity.entity";
import { CreateUnityInput } from "./dto/create-unity.input";
import { UpdateUnityInput } from "./dto/update-unity.input";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/user/entities/user.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { TransferPatientInput } from "./dto/transfer-patient.input";
import { RemoveUnitResponse } from "./dto/remove-unity-input";

@Resolver(() => Unity)
export class UnityResolver {
  constructor(private readonly unityService: UnityService) {}

  @Mutation(() => Unity)
  @UseGuards(JwtAuthGuard)
  createUnity(
    @Args("createUnityInput") createUnityInput: CreateUnityInput,
    @CurrentUser() user: User
  ) {
    if (user.role !== "admin") {
      throw new Error("Only admin can create unities");
    }
    return this.unityService.create(createUnityInput, user.id);
  }

  @Query(() => [Unity], { name: "getUnities" })
  findAll(@Args("departmentId", { type: () => Int }) departmentId: number) {
    return this.unityService.findAll(departmentId);
  }

  @Query(() => Unity, { name: "getUnity" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.unityService.findOne(id);
  }

  @Mutation(() => Unity)
  updateUnity(@Args("updateUnityInput") updateUnityInput: UpdateUnityInput) {
    return this.unityService.update(updateUnityInput.id, updateUnityInput);
  }

  @Mutation(() => RemoveUnitResponse)
  removeUnity(@Args("id", { type: () => Int }) id: number) {
    return this.unityService.remove(id);
  }

  @Mutation(() => Patient)
  @UseGuards(JwtAuthGuard)
  async transferPatient(
    @Args("transferPatientInput") transferPatientInput: TransferPatientInput,
    @CurrentUser() user: User
  ): Promise<Patient> {
    return await this.unityService.transferPatient(
      transferPatientInput,
      user.id
    );
  }
}
