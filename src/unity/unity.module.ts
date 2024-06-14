import { Module } from '@nestjs/common';
import { UnityService } from './unity.service';
import { UnityResolver } from './unity.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unity } from './entities/unity.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Unity])],
  providers: [UnityResolver, UnityService],
})
export class UnityModule {}
