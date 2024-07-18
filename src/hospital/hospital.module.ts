import { Module } from "@nestjs/common";
import { HospitalService } from "./hospital.service";
import { HospitalResolver } from "./hospital.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hospital } from "./entities/hospital.entity";
import { User } from "src/user/entities/user.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Hospital, User]), AuthModule],
  providers: [HospitalResolver, HospitalService]
})
export class HospitalModule {}
