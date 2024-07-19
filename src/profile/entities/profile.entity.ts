// profile.entity.ts

import { ObjectType, Field, Int } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity"; // Import User entity
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
@ObjectType()
export class Profile {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  bio: string;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  @Field(() => User)
  user: User;

  @Column()
  userId: number;
}
