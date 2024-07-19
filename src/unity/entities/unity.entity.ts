import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Department } from "src/department/entities/department.entity";
import { Handover } from "src/handover/entities/handover.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
@ObjectType()
export class Unity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Department, (department) => department.unities, {
    cascade: true,
    onDelete: "SET NULL"
  })
  @Field(() => Department)
  department: Department;

  @OneToMany(() => User, (user) => user.unity, {
    cascade: true,
    onDelete: "SET NULL"
  })
  @Field(() => User, { nullable: true })
  staff: User[];

  @OneToMany(() => Patient, (patient) => patient.unity, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @Field(() => [Patient], { nullable: true })
  patients?: Patient[];

  @OneToMany(() => Handover, (handover) => handover.unity, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @Field(() => [Handover], { nullable: true })
  handovers?: Handover[];
}
