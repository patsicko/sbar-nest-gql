import { Module } from "@nestjs/common";
import { UnityService } from "./unity.service";
import { UnityResolver } from "./unity.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Unity } from "./entities/unity.entity";
import { Department } from "src/department/entities/department.entity";
import { User } from "src/user/entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { Patient } from "src/patient/entities/patient.entity";
import { Sbar } from "src/sbar/entities/sbar.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Unity, Department, User, Patient, Sbar]),
    AuthModule
  ],
  providers: [UnityResolver, UnityService]
})
export class UnityModule {}
