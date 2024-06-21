import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { User } from 'src/user/entities/user.entity';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department) private readonly departmentRepository: Repository<Department>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createDepartmentInput: CreateDepartmentInput, adminId: number): Promise<Department> {
    const admin = await this.userRepository.findOne({ where: { id: adminId }, relations: ['hospital'] });
    if (!admin) {
      throw new Error('Admin not found');
    }

    if (!admin.hospital) {
      throw new Error('Admin does not belong to any hospital');
    }

    const existingDepartment = await this.departmentRepository.findOne({
      where: { name: createDepartmentInput.name, hospital: admin.hospital },
    });

    if (existingDepartment) {
      throw new ConflictException(`Department '${createDepartmentInput.name}' already exists in the hospital`);
    }

    const department = this.departmentRepository.create({
      ...createDepartmentInput,
      hospital: admin.hospital,
    });

    return await this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({ relations: ['hospital', 'unities', 'staff', 'patients'] });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({ where: { id }, relations: ['hospital', 'unities', 'staff', 'patients'] });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentInput: UpdateDepartmentInput): Promise<Department> {
    const department = await this.findOne(id);

    Object.assign(department, updateDepartmentInput);

    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<Department> {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
    return department;
  }
}
