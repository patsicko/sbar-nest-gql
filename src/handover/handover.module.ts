import { Module } from "@nestjs/common";
import { HandoverService } from "./handover.service";
import { HandoverResolver } from "./handover.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Handover } from "./entities/handover.entity";
import { Sbar } from "src/sbar/entities/sbar.entity";
import { User } from "src/user/entities/user.entity";
import { Unity } from "src/unity/entities/unity.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Handover, Unity, User, Sbar])],
  providers: [HandoverResolver, HandoverService]
})
export class HandoverModule {}
