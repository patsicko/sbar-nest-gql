import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field()
  firstName:string
  
  @Column()
  @Field()
  lastName:string

  @Column()
  @Field()
  email:string

  @Column()
  @Field()
  password:string
}
