import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Sbar {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  situation: string;

  @Column()
  @Field()
  background: string;

  @Column()
  @Field()
  assessment: string;

  @Column()
  @Field()
  recommendation: string;

  @ManyToOne(() => Patient, patient => patient.sbars, { nullable: false, onDelete: 'CASCADE' })
  @Field(() => Patient)
  patient: Patient;

  @ManyToOne(() => User, user => user.sbarsCreated, { nullable: false })
  @Field(() => User)
  createdBy: User;

  @ManyToOne(() => User, user => user.sbarsUpdated, { nullable: true })
  @Field(() => User, { nullable: true })
  updatedBy?: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => String)
  createdAt: String;
}
