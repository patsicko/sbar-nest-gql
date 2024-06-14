import { Module } from '@nestjs/common';
import { SbarService } from './sbar.service';
import { SbarResolver } from './sbar.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sbar } from './entities/sbar.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sbar])],
  providers: [SbarResolver, SbarService],
})
export class SbarModule {}
