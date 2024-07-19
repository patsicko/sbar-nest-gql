import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PatientService } from "./patient.service";
import { Patient } from "./entities/patient.entity";
import { CreatePatientInput } from "./dto/create-patient.input";
import { UpdatePatientInput } from "./dto/update-patient.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/user/entities/user.entity";

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Mutation(() => Patient)
  @UseGuards(JwtAuthGuard)
  createPatient(
    @Args("createPatientInput") createPatientInput: CreatePatientInput,
    @CurrentUser() user: User
  ) {
    if (!user.approved) {
      throw new Error("You need admin approval to admit patient");
    }
    return this.patientService.create(createPatientInput, user.id);
  }

  @Query(() => [Patient], { name: "getPatients" })
  findAll() {
    return this.patientService.findAll();
  }

  @Query(() => [Patient], { name: "findPatientsByUnity" })
  findPatientsByUnity(@Args("unityId", { type: () => Int }) unityId: number) {
    return this.patientService.findPatientsByUnity(unityId);
  }

  @Query(() => Patient, { name: "getPatient" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.patientService.findOne(id);
  }

  @Mutation(() => Patient)
  updatePatient(
    @Args("updatePatientInput") updatePatientInput: UpdatePatientInput
  ) {
    return this.patientService.update(
      updatePatientInput.id,
      updatePatientInput
    );
  }

  @Mutation(() => Patient)
  archivePatient(@Args("patientId", { type: () => Int }) patientId: number) {
    return this.patientService.archivePatient(patientId);
  }

  @Mutation(() => Patient)
  removePatient(@Args("id", { type: () => Int }) id: number) {
    return this.patientService.remove(id);
  }
}
