import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Mutation(() => Patient)
  createPatient(@Args('createPatientInput') createPatientInput: CreatePatientInput) {
    return this.patientService.create(createPatientInput);
  }

  @Query(() => [Patient], { name: 'patient' })
  findAll() {
    return this.patientService.findAll();
  }

  @Query(() => Patient, { name: 'patient' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.findOne(id);
  }

  @Mutation(() => Patient)
  updatePatient(@Args('updatePatientInput') updatePatientInput: UpdatePatientInput) {
    return this.patientService.update(updatePatientInput.id, updatePatientInput);
  }

  @Mutation(() => Patient)
  removePatient(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.remove(id);
  }
}
