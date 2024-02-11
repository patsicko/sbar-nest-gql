import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HospitalService } from './hospital.service';
import { Hospital } from './entities/hospital.entity';
import { CreateHospitalInput } from './dto/create-hospital.input';
import { UpdateHospitalInput } from './dto/update-hospital.input';

@Resolver(() => Hospital)
export class HospitalResolver {
  constructor(private readonly hospitalService: HospitalService) {}

  @Mutation(() => Hospital)
  createHospital(@Args('createHospitalInput') createHospitalInput: CreateHospitalInput) {
    return this.hospitalService.create(createHospitalInput);
  }

  @Query(() => [Hospital], { name: 'hospital' })
  findAll() {
    return this.hospitalService.findAll();
  }

  @Query(() => Hospital, { name: 'hospital' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hospitalService.findOne(id);
  }

  @Mutation(() => Hospital)
  updateHospital(@Args('updateHospitalInput') updateHospitalInput: UpdateHospitalInput) {
    return this.hospitalService.update(updateHospitalInput.id, updateHospitalInput);
  }

  @Mutation(() => Hospital)
  removeHospital(@Args('id', { type: () => Int }) id: number) {
    return this.hospitalService.remove(id);
  }
}
