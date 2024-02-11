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
   
    user.firstName=updateUserInput.firstName || user.firstName
    user.lastName=updateUserInput.lastName || user.lastName
    user.email=updateUserInput.email || user.email
    

    return await this.userRepository.save(user)
  }

  async remove(id: number):Promise<User | null> {
    const userToRemove=await this.userRepository.findOne({where:{id}});
    if(!userToRemove){
      return null;
    }
    await this.userRepository.delete(userToRemove);
    return userToRemove;
  }
}
