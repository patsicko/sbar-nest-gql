// patient.entity.ts

import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Department } from "src/department/entities/department.entity";
import { Hospital } from "src/hospital/entities/hospital.entity";
import { Sbar } from "src/sbar/entities/sbar.entity";
import { Unity } from "src/unity/entities/unity.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
@ObjectType()
export class Patient {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @ManyToOne(() => Unity, (unity) => unity.patients,{
    cascade: true,
    onDelete: "CASCADE"
  })
  @Field(() => Unity)
  unity: Unity;

  @ManyToOne(() => Department, (department) => department.patients, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @Field(() => Department)
  department: Department;

  @ManyToOne(()=>Hospital, (hospital)=>hospital.patients,{
    cascade:true,onDelete:"CASCADE"
  })
  @Field(()=>Hospital)
  hospital:Hospital

  @OneToMany(() => Sbar, (sbar) => sbar.patient)
  @Field(() => [Sbar], { nullable: true })
  sbars?: Sbar[];

  @Column({ default: true })
  @Field()
  isActive: boolean;
}
