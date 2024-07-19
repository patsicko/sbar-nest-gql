import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Handover } from "./entities/handover.entity";
import { CreateHandoverInput } from "./dto/create-handover.input";
import { UpdateHandoverInput } from "./dto/update-handover.input";
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
    const unity = await this.unityRepository.findOne({
      where: { id: createHandoverInput.unityId }
    });
    if (!unity) {
      throw new NotFoundException(
        `Unity with ID ${createHandoverInput.unityId} not found`
      );
    }

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

    const sbars = createHandoverInput.sbarIds
      ? await this.sbarRepository.findByIds(createHandoverInput.sbarIds)
      : [];

    const handover = this.handoverRepository.create({
      ...createHandoverInput,
      unity,
      fromStaff,
      toStaff,
      sbarsGiven: sbars
    });

    return await this.handoverRepository.save(handover);
  }

  async findAll(): Promise<Handover[]> {
    return this.handoverRepository.find({
      relations: ["unity", "fromStaff", "toStaff", "sbarsGiven"]
    });
  }

  async findOne(id: number): Promise<Handover> {
    const handover = await this.handoverRepository.findOne({
      where: { id },
      relations: ["unity", "fromStaff", "toStaff", "sbarsGiven"]
    });
    if (!handover) {
      throw new NotFoundException(`Handover with ID ${id} not found`);
    }
    return handover;
  }

  async update(
    id: number,
    updateHandoverInput: UpdateHandoverInput
  ): Promise<Handover> {
    const handover = await this.findOne(id);

    if (updateHandoverInput.sbarIds) {
      const sbars = await this.sbarRepository.findByIds(
        updateHandoverInput.sbarIds
      );
      handover.sbarsGiven = sbars;
    }

    Object.assign(handover, updateHandoverInput);

    return this.handoverRepository.save(handover);
  }

  async remove(id: number): Promise<Handover> {
    const handover = await this.findOne(id);
    await this.handoverRepository.remove(handover);
    return handover;
  }
}
