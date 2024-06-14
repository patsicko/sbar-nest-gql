import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Hospital } from './entities/hospital.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateHospitalInput } from './dto/update-hospital.input';
import { CreateHospitalWithAdminInput } from './dto/create-hospital.input';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital) private readonly hospitalRepository: Repository<Hospital>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createWithAdmin(createHospitalWithAdminInput: CreateHospitalWithAdminInput): Promise<Hospital> {
    const { hospitalName, district, sector, firstName, lastName, email, password } = createHospitalWithAdminInput;

    // Check if the hospital already exists
    const existingHospital = await this.hospitalRepository.findOne({ where: { hospitalName } });
    if (existingHospital) {
      throw new Error('Hospital ' + hospitalName + ' already exists');
    }

    // Check if a user with the provided email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with email ' + email + ' already exists');
    }

    // Create the new hospital
    const newHospital = new Hospital();
    newHospital.hospitalName = hospitalName;
    newHospital.district = district;
    newHospital.sector = sector;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.role = 'admin';
    newUser.approved = false; 
    const savedHospital = await this.hospitalRepository.save(newHospital);

    newUser.hospital = savedHospital;
    await this.userRepository.save(newUser);
    return this.hospitalRepository.findOne({
      where: { hospitalId: savedHospital.hospitalId },
      relations: ['staff'],
    });
  }

  async findAll(): Promise<Hospital[]> {
    return await this.hospitalRepository.find({ relations: ['staff'] });
  }

  findOne(id: number) {
    return this.hospitalRepository.findOne({ where: { hospitalId: id } });
  }

  update(id: number, updateHospitalInput: UpdateHospitalInput) {
    return `This action updates a #${id} hospital`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospital`;
  }
}
