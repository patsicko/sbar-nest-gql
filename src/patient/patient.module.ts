import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientResolver } from './patient.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Patient])],
  providers: [PatientResolver, PatientService],
})
export class PatientModule {}
