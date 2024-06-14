import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from 'src/department/entities/department.entity';
import { Handover } from 'src/handover/entities/handover.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Unity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Department, department => department.unities)
  @Field(() => Department)
  department: Department;

  @OneToMany(() => Patient, patient => patient.unity)
  @Field(() => [Patient], { nullable: true })
  patients?: Patient[];

  @OneToMany(() => Handover, handover => handover.unity)
  @Field(() => [Handover], { nullable: true })
  handovers?: Handover[];
}
