// user.entity.ts

import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Handover } from "src/handover/entities/handover.entity";
import { Hospital } from "src/hospital/entities/hospital.entity";
import { Sbar } from "src/sbar/entities/sbar.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Department } from "src/department/entities/department.entity";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Unity } from "src/unity/entities/unity.entity";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @Field()
  @IsNotEmpty()
  lastName: string;

  @Column({ unique: true })
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @Field()
  @IsNotEmpty()
  password: string;

  @Column({
    type: "enum",
    enum: [
      "superAdmin",
      "admin",
      "coordinator",
      "matron",
      "hod",
      "user",
      "doctor",
      "dg",
      "nurse",
      "mid",
      "anesthesist"
    ],
    default: "user"
  })
  @Field()
  @IsNotEmpty()
  role: string;

  @Column({ default: false })
  @Field()
  @IsNotEmpty()
  approved: boolean;

  @ManyToOne(() => Hospital, (hospital) => hospital.staff)
  @Field(() => Hospital, { nullable: true })
  hospital?: Hospital;

  @ManyToOne(() => Department, (department) => department.staff)
  @Field(() => Department, { nullable: true })
  department?: Department;

  @ManyToOne(() => Unity, (unity) => unity.staff)
  @Field(() => Unity, { nullable: true })
  unity?: Unity;

  @OneToMany(() => Handover, (handover) => handover.fromStaff)
  @Field(() => [Handover], { nullable: true })
  handoversGiven?: Handover[];

  @OneToMany(() => Handover, (handover) => handover.toStaff)
  @Field(() => [Handover], { nullable: true })
  handoversReceived?: Handover[];

  @OneToMany(() => Sbar, (sbar) => sbar.createdBy)
  @Field(() => [Sbar], { nullable: true })
  sbarsCreated?: Sbar[];

  @OneToMany(() => Sbar, (sbar) => sbar.updatedBy)
  @Field(() => [Sbar], { nullable: true })
  sbarsUpdated?: Sbar[];
}
