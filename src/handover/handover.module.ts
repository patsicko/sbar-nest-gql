import { Module } from '@nestjs/common';
import { HandoverService } from './handover.service';
import { HandoverResolver } from './handover.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Handover } from './entities/handover.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Handover])],
  providers: [HandoverResolver, HandoverService],
})
export class HandoverModule {}
