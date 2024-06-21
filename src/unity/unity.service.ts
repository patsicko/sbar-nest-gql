import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unity } from './entities/unity.entity';
import { CreateUnityInput } from './dto/create-unity.input';
import { Department } from 'src/department/entities/department.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateUnityInput } from './dto/update-unity.input';


@Injectable()
export class UnityService {
  constructor(
    @InjectRepository(Unity) private readonly unityRepository: Repository<Unity>,
    @InjectRepository(Department) private readonly departmentRepository: Repository<Department>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createUnityInput: CreateUnityInput, adminId: number): Promise<Unity> {
    const admin = await this.userRepository.findOne({ where: { id: adminId }, relations: ['hospital'] });
    if (!admin) {
      throw new Error('Admin not found');
    }

    if (!admin.hospital) {
      throw new Error('Admin does not belong to any hospital');
    }

    const department = await this.departmentRepository.findOne({ where: { id: createUnityInput.departmentId, hospital: admin.hospital } });
    if (!department) {
      throw new Error('Department not found or does not belong to your hospital');
    }

    const existingUnity = await this.unityRepository.findOne({
      where: { name: createUnityInput.name, department },
    });

    if (existingUnity) {
      throw new ConflictException(`Unity '${createUnityInput.name}' already exists in the department`);
    }

    const unity = this.unityRepository.create({
      ...createUnityInput,
      department,
    });

    return await this.unityRepository.save(unity);
  }

  async findAll(): Promise<Unity[]> {
    return this.unityRepository.find({ relations: ['department', 'patients', 'handovers'] });
  }

  async findOne(id: number): Promise<Unity> {
    const unity = await this.unityRepository.findOne({ where: { id }, relations: ['department', 'patients', 'handovers'] });
    if (!unity) {
      throw new NotFoundException(`Unity with ID ${id} not found`);
    }
    return unity;
  }

  async update(id: number, updateUnityInput: UpdateUnityInput): Promise<Unity> {
    const unity = await this.findOne(id);

    Object.assign(unity, updateUnityInput);

    return this.unityRepository.save(unity);
  }

  async remove(id: number): Promise<Unity> {
    const unity = await this.findOne(id);
    await this.unityRepository.remove(unity);
    return unity;
  }
}
