import { Module } from '@nestjs/common';
import { SbarService } from './sbar.service';
import { SbarResolver } from './sbar.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sbar } from './entities/sbar.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Sbar,Patient,User]),AuthModule],
  providers: [SbarResolver, SbarService],
})
export class SbarModule {}
