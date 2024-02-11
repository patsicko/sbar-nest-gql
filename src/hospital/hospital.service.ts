import { Injectable } from '@nestjs/common';
import { CreateHospitalInput } from './dto/create-hospital.input';
import { UpdateHospitalInput } from './dto/update-hospital.input';

@Injectable()
export class HospitalService {
  create(createHospitalInput: CreateHospitalInput) {
    return 'This action adds a new hospital';
  }

  findAll() {
    return `This action returns all hospital`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospital`;
  }

  update(id: number, updateHospitalInput: UpdateHospitalInput) {
    return `This action updates a #${id} hospital`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospital`;
  }
}
