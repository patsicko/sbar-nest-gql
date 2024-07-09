import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { Unity } from 'src/unity/entities/unity.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdatePatientInput } from './dto/update-patient.input';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Unity) private readonly unityRepository: Repository<Unity>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createPatientInput: CreatePatientInput, staffId: number): Promise<Patient> {
    const staff = await this.userRepository.findOne({ where: { id: staffId }, relations: ['department'] });
    if (!staff) {
      throw new Error('Staff not found');
    }

    const unity = await this.unityRepository.findOne({ where: { id: createPatientInput.unityId, department: staff.department } });
    if (!unity) {
      throw new Error('Unity not found or does not belong to your department');
    }

    const patient = this.patientRepository.create({
      ...createPatientInput,
      unity,
      department: staff.department,
    });

    return await this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find({ relations: ['unity', 'department', 'sbars'] });
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id }, relations: ['unity', 'department', 'sbars'] });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async findPatientsByUnity(unityId: number): Promise<Patient[]> {
    // Find unity from repository
    const unity = await this.unityRepository.findOne({where:{id:unityId}, relations: ['patients'] });

    if (!unity) {
      throw new NotFoundException(`Unity with ID ${unityId} not found`);
    }

    // Query patients associated with the found unity
    const patients = await this.patientRepository.find({ where: { unity }, relations: ['unity', 'department', 'sbars'] });

    return patients;
  }

  async update(id: number, updatePatientInput: UpdatePatientInput): Promise<Patient> {
    const patient = await this.findOne(id);

    Object.assign(patient, updatePatientInput);

    return this.patientRepository.save(patient);
  }

  async remove(id: number): Promise<Patient> {
    const patient = await this.findOne(id);
    await this.patientRepository.remove(patient);
    return patient;
  }
}
