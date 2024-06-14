import { Injectable } from '@nestjs/common';
import { CreateSbarInput } from './dto/create-sbar.input';
import { UpdateSbarInput } from './dto/update-sbar.input';

@Injectable()
export class SbarService {
  create(createSbarInput: CreateSbarInput) {
    return 'This action adds a new sbar';
  }

  findAll() {
    return `This action returns all sbar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sbar`;
  }

  update(id: number, updateSbarInput: UpdateSbarInput) {
    return `This action updates a #${id} sbar`;
  }

  remove(id: number) {
    return `This action removes a #${id} sbar`;
  }
}
