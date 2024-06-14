import { Injectable } from '@nestjs/common';
import { CreateHandoverInput } from './dto/create-handover.input';
import { UpdateHandoverInput } from './dto/update-handover.input';

@Injectable()
export class HandoverService {
  create(createHandoverInput: CreateHandoverInput) {
    return 'This action adds a new handover';
  }

  findAll() {
    return `This action returns all handover`;
  }

  findOne(id: number) {
    return `This action returns a #${id} handover`;
  }

  update(id: number, updateHandoverInput: UpdateHandoverInput) {
    return `This action updates a #${id} handover`;
  }

  remove(id: number) {
    return `This action removes a #${id} handover`;
  }
}
