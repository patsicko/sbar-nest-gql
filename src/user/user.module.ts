import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Unity } from 'src/unity/entities/unity.entity';
import { Department } from 'src/department/entities/department.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Hospital,Department,Unity]),AuthModule],
  providers: [UserResolver, UserService],
  exports:[UserService]
})
export class UserModule {}
