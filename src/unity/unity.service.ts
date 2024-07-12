import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unity } from './entities/unity.entity';
import { CreateUnityInput } from './dto/create-unity.input';
import { Department } from 'src/department/entities/department.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateUnityInput } from './dto/update-unity.input';
import { TransferPatientInput } from './dto/transfer-patient.input';
import { Patient } from 'src/patient/entities/patient.entity';
import { Sbar } from 'src/sbar/entities/sbar.entity';


@Injectable()
export class UnityService {
  constructor(
    @InjectRepository(Unity) private readonly unityRepository: Repository<Unity>,
    @InjectRepository(Department) private readonly departmentRepository: Repository<Department>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Patient) private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Sbar) private readonly sbarRepository: Repository<Sbar>
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

 
  async findAll(departmentId: number): Promise<Unity[]> {
    const query = this.unityRepository.createQueryBuilder('unity')
      .leftJoinAndSelect('unity.department', 'department')
      .leftJoinAndSelect('unity.patients', 'patients')
      .leftJoinAndSelect('unity.handovers', 'handovers');

    if (departmentId) {
      query.where('unity.departmentId = :departmentId', { departmentId });
    }

    return await query.getMany();
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

  async remove(id: number): Promise<Unity|null|any> {
    const unity = await this.findOne(id);
    await this.unityRepository.remove(unity);
    return {message:"Unity "+unity.name + "deleted successfully"};
  }


  async transferPatient(transferPatientInput: TransferPatientInput,transferedByUserId: number): Promise<Patient> {
    const { patientId, currentUnityId, targetUnityId } = transferPatientInput;

    const transferedByUser = await this.userRepository.findOne({where:{id:transferedByUserId}});
    if (!transferedByUser) {
      throw new NotFoundException(`User with ID ${transferedByUserId} not found`);
    }
    const patient = await this.patientRepository.findOne({where:{id:patientId}, relations: ['unity'] });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

   
    const currentUnity = await this.unityRepository.findOne({where:{id:currentUnityId}});
    if (!currentUnity) {
      throw new NotFoundException(`Unity with ID ${currentUnityId} not found`);
    }

    const targetUnity = await this.unityRepository.findOne({where:{id:targetUnityId}});
    if (!targetUnity) {
      throw new NotFoundException(`Unity with ID ${targetUnityId} not found`);
    }

    patient.unity = targetUnity;
    const updatedPatient = await this.patientRepository.save(patient);

    const sbars = await this.sbarRepository.find({ where: { patient } });
    const updatedSbars = await Promise.all(
      sbars.map(async (sbar) => {
        sbar.patient = updatedPatient;
        return await this.sbarRepository.save(sbar);
      })
    );

    return updatedPatient;
  }
}
