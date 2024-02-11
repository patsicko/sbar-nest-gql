import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Hospital {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Hospital Id' })
  hospitalId: number;

  @Column()
  @Field()
  name:string;

  @Column()
  @Field({nullable:true})
  district:string

  @Column()
  @Field({nullable:true})
  city:string
  
  
  @OneToMany(()=>User, user=>user.hospital)
  @Field(()=>User,{nullable:true})
  users:User[];

}
