import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { CreateStaffInput } from './dto/create-staff.input';
import { Hospital } from 'src/hospital/entities/hospital.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Hospital) private readonly hospitalRepository:Repository<Hospital>
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserInput.password);
    const user = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }


  async createStaff(createStaffInput: CreateStaffInput): Promise<User | any> {
    try {
       
        const existingStaff = await this.userRepository.findOne({ where: { email: createStaffInput.email } });
        if (existingStaff) {
            throw new Error(`Staff with email '${createStaffInput.email}' already exists`);
        }


        const hospital = await this.hospitalRepository.findOne({ where: { hospitalId: createStaffInput.hospitalId } });
        if (!hospital) {
            throw new Error(`Hospital with ID '${createStaffInput.hospitalId}' not found`);
        }

      
        const hashedPassword = await this.hashPassword(createStaffInput.password);

  
        const staff = this.userRepository.create({
            ...createStaffInput,
            password: hashedPassword,
            hospital: hospital,
        });

     
        return await this.userRepository.save(staff);
    } catch (error) {
    
        return error; 
    }
}


  async approveUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    user.approved = true;

    return await this.userRepository.save(user);
  }
  async findAll(user: User): Promise<User[]> {
    const currentUser = await this.findOne(user.id, ['hospital']);
    if (currentUser.role === 'superAdmin') {
      return this.userRepository.find({ relations: ['hospital'] });
    } else{
      return this.userRepository.find({ where: { hospital: currentUser.hospital }, relations: ['hospital'] });
    }
  }
  async findOne(id: number, relations: string[] = []): Promise<User> {
    return await this.userRepository.findOne({ where: { id }, relations });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log('User got by email', user);
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    user.firstName = updateUserInput.firstName || user.firstName;
    user.lastName = updateUserInput.lastName || user.lastName;
    user.email = updateUserInput.email || user.email;

    return await this.userRepository.save(user);
  }

  async makeAdmin(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    user.role='admin'

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<User | null> {
    const userToRemove = await this.userRepository.findOne({ where: { id } });
    if (!userToRemove) {
      return null;
    }
    await this.userRepository.delete(userToRemove);
    return userToRemove;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
