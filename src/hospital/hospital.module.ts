import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalResolver } from './hospital.resolver';

@Module({
  providers: [HospitalResolver, HospitalService],
})
export class HospitalModule {}
