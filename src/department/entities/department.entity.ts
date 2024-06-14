// department.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Patient } from 'src/patient/entities/patient.entity'; // Import Patient entity
import { Unity } from 'src/unity/entities/unity.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Department {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Hospital, hospital => hospital.departments)
  @Field(() => Hospital)
  hospital: Hospital;

  @OneToMany(() => Patient, patient => patient.department) 
  @Field(() => [Patient], { nullable: true })
  patients?: Patient[]; 

  @OneToMany(() => Unity, unity => unity.department)
  @Field(() => [Unity], { nullable: true })
  unities?: Unity[];

  @OneToMany(() => User, user => user.department)
  @Field(() => [User], { nullable: true })
  staff?: User[];
}
