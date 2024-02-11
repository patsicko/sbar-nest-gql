import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({type:'enum',enum:['superAdmin','admin','coordinator','matron','hod','user','doctor'],default:'user'})
  @Field()
  role:string

  @ManyToOne(()=>Hospital,hospital=>hospital.users)
  @Field({nullable:true})
  hospital:Hospital
}
