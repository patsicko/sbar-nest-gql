// handover.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Unity } from 'src/unity/entities/unity.entity';
import { User } from 'src/user/entities/user.entity';
import { Sbar } from 'src/sbar/entities/sbar.entity'; 
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Handover {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Unity, unity => unity.handovers)
  @Field(() => Unity)
  unity: Unity;

  @ManyToOne(() => User, user => user.handoversGiven)
  @Field(() => User)
  fromStaff: User;

  @ManyToOne(() => User, user => user.handoversReceived)
  @Field(() => User)
  toStaff: User;

  @ManyToMany(() => Sbar, { cascade: true })
  @JoinTable()
  @Field(() => [Sbar], { nullable: true })
  sbarsGiven?: Sbar[];

  @Column()
  handoverDetails: string;

  @Column({ nullable: true })
  receiptSignature: boolean;
}
