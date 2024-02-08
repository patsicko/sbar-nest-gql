import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}

  async create(createUserInput: CreateUserInput):Promise<User> {
    return await this.userRepository.save(createUserInput)
  }

  async findAll():Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number):Promise<User> {
    return await this.userRepository.findOne({where:{id}})
  }

  async update(id:number,updateUserInput: UpdateUserInput):Promise<User> {

    const user= await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new Error("User not found");
    }
   
    user.name=updateUserInput.name || user.name

    user.email=updateUserInput.email || user.email

    return await this.userRepository.save(user)
  }

  async remove(id: number):Promise<any> {
    return await this.userRepository.delete(id)
  }
}
