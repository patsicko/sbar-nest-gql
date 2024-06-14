import { Injectable } from '@nestjs/common';
import { CreateUnityInput } from './dto/create-unity.input';
import { UpdateUnityInput } from './dto/update-unity.input';

@Injectable()
export class UnityService {
  create(createUnityInput: CreateUnityInput) {
    return 'This action adds a new unity';
  }

  findAll() {
    return `This action returns all unity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unity`;
  }

  update(id: number, updateUnityInput: UpdateUnityInput) {
    return `This action updates a #${id} unity`;
  }

  remove(id: number) {
    return `This action removes a #${id} unity`;
  }
}
