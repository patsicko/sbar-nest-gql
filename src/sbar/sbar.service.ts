import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sbar } from './entities/sbar.entity';
import { CreateSbarInput } from './dto/create-sbar.input';
import { UpdateSbarInput } from './dto/update-sbar.input';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SbarService {
  constructor(
    @InjectRepository(Sbar) private readonly sbarRepository: Repository<Sbar>,
    @InjectRepository(Patient) private readonly patientRepository: Repository<Patient>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createSbarInput: CreateSbarInput,currentUser:User): Promise<Sbar> {
    const patient = await this.patientRepository.findOne({ where: { id: createSbarInput.patientId } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${createSbarInput.patientId} not found`);
    }

    const createdBy = await this.userRepository.findOne({ where: { id: currentUser.id } });
    if (!createdBy) {
      throw new NotFoundException(`User with ID ${createSbarInput.createdById} not found`);
    }

    const sbar = this.sbarRepository.create({
      ...createSbarInput,
      patient,
      createdBy,
    });

    const createdSbar= await this.sbarRepository.save(sbar);
    console.log("crestedsbar",createdSbar)

    return createdSbar
  }

  async findAll(): Promise<Sbar[]> {
    return this.sbarRepository.find({ relations: ['patient', 'createdBy', 'updatedBy'] });
  }

  async findOne(id: number): Promise<Sbar> {
    const sbar = await this.sbarRepository.findOne({ where: { id }, relations: ['patient', 'createdBy', 'updatedBy'] });
    if (!sbar) {
      throw new NotFoundException(`Sbar with ID ${id} not found`);
    }
    return sbar;
  }

  async update(id: number, updateSbarInput: UpdateSbarInput): Promise<Sbar> {
    const sbar = await this.findOne(id);

    if (updateSbarInput.updatedById) {
      const updatedBy = await this.userRepository.findOne({ where: { id: updateSbarInput.updatedById } });
      if (!updatedBy) {
        throw new NotFoundException(`User with ID ${updateSbarInput.updatedById} not found`);
      }
      sbar.updatedBy = updatedBy;
    }

    Object.assign(sbar, updateSbarInput);

    return this.sbarRepository.save(sbar);
  }

  async remove(id: number): Promise<Sbar> {
    const sbar = await this.findOne(id);
    await this.sbarRepository.remove(sbar);
    return sbar;
  }
}
