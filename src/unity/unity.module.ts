import { Module } from '@nestjs/common';
import { UnityService } from './unity.service';
import { UnityResolver } from './unity.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unity } from './entities/unity.entity';
import { Department } from 'src/department/entities/department.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Unity,Department,User]),AuthModule],
  providers: [UnityResolver, UnityService],
})
export class UnityModule {}
