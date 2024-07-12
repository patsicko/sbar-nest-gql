import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HospitalService } from './hospital.service';
import { Hospital } from './entities/hospital.entity';
import { CreateHospitalWithAdminInput } from './dto/create-hospital.input';
import { UpdateHospitalInput } from './dto/update-hospital.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Hospital)
export class HospitalResolver {
  constructor(private readonly hospitalService: HospitalService) {}

  @Mutation(() => Hospital)

  createHospital(@Args('createHospitalInput') createHospitalInput: CreateHospitalWithAdminInput) {
    return this.hospitalService.createWithAdmin(createHospitalInput)
  }

  @Query(() => [Hospital], { name: 'AllHospitals' })
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
