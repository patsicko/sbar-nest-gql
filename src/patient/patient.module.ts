import { Module } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { PatientResolver } from "./patient.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "./entities/patient.entity";
import { Unity } from "src/unity/entities/unity.entity";
import { User } from "src/user/entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { Department } from "src/department/entities/department.entity";
import { Hospital } from "src/hospital/entities/hospital.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Unity, User, Department,Hospital]),
    AuthModule
  ],
  providers: [PatientResolver, PatientService]
})
export class PatientModule {}
