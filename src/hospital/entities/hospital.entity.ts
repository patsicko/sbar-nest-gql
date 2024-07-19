import { ObjectType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Department } from "src/department/entities/department.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Hospital {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "Hospital Id" })
  hospitalId: number;

  @Column()
  @Field()
  @IsNotEmpty()
  hospitalName: string;

  @Column()
  @Field({ nullable: true })
  @IsNotEmpty()
  district: string;

  @Column()
  @Field({ nullable: true })
  @IsNotEmpty()
  sector: string;

  @OneToMany(() => Department, (department) => department.hospital)
  @Field(() => [Department], { nullable: true })
  departments: Department[];

  @OneToMany(() => User, (user) => user.hospital)
  @Field(() => [User], { nullable: true })
  staff: User[];
}
