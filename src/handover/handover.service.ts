import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Handover } from "./entities/handover.entity";
import { CreateHandoverInput } from "./dto/create-handover.input";
import { ApproveHandoverInput } from "./dto/update-handover.input";
import { Unity } from "src/unity/entities/unity.entity";
import { User } from "src/user/entities/user.entity";
import { Sbar } from "src/sbar/entities/sbar.entity";

@Injectable()
export class HandoverService {
  constructor(
    @InjectRepository(Handover)
    private readonly handoverRepository: Repository<Handover>,
    @InjectRepository(Unity)
    private readonly unityRepository: Repository<Unity>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Sbar) private readonly sbarRepository: Repository<Sbar>
  ) {}

  async create(createHandoverInput: CreateHandoverInput): Promise<Handover> {
    const fromStaff = await this.userRepository.findOne({
      where: { id: createHandoverInput.fromStaffId }
    });
    if (!fromStaff) {
      throw new NotFoundException(
        `User with ID ${createHandoverInput.fromStaffId} not found`
      );
    }

    const toStaff = await this.userRepository.findOne({
      where: { id: createHandoverInput.toStaffId }
    });
    if (!toStaff) {
      throw new NotFoundException(
        `User with ID ${createHandoverInput.toStaffId} not found`
      );
    }



    const handover = this.handoverRepository.create({
      handoverDetails:createHandoverInput.handoverDetails,
      fromStaff,
      toStaff,
      receiptSignature:false

     
    });

    return await this.handoverRepository.save(handover);
  }

  async findAll(): Promise<Handover[]> {
    return this.handoverRepository.find({
      relations: ["fromStaff", "toStaff"]
    });
  }

  async findOne(id: number): Promise<Handover> {
    const handover = await this.handoverRepository.findOne({
      where: { id },
      relations: ["fromStaff", "toStaff"]
    });
    if (!handover) {
      throw new NotFoundException(`Handover with ID ${id} not found`);
    }
    return handover;
  }

  async approve(
    id: number,
    approveHandoverInput: ApproveHandoverInput
  ): Promise<Handover> {
    const handover = await this.findOne(id);
    Object.assign(handover, approveHandoverInput);

    return this.handoverRepository.save(handover);
  }

  async remove(id: number): Promise<Handover> {
    const handover = await this.findOne(id);
    await this.handoverRepository.remove(handover);
    return handover;
  }
}
