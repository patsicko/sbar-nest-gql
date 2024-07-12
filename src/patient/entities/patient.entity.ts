// patient.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from 'src/department/entities/department.entity';
import { Sbar } from 'src/sbar/entities/sbar.entity';
import { Unity } from 'src/unity/entities/unity.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Unity, unity => unity.patients)
  @Field(() => Unity)
  unity: Unity;

  @ManyToOne(() => Department, department => department.patients)
  @Field(() => Department)
  department: Department;

  @OneToMany(() => Sbar, sbar => sbar.patient)
  @Field(() => [Sbar], { nullable: true })
  sbars?: Sbar[];
}
