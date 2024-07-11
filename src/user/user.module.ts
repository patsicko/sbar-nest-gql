import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Hospital } from 'src/hospital/entities/hospital.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Hospital]),AuthModule],
  providers: [UserResolver, UserService],
  exports:[UserService]
})
export class UserModule {}
