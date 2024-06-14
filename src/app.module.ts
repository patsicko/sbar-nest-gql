import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { HospitalModule } from './hospital/hospital.module';
import { ProfileModule } from './profile/profile.module';
import { DepartmentModule } from './department/department.module';
import { UnityModule } from './unity/unity.module';
import { PatientModule } from './patient/patient.module';
import { SbarModule } from './sbar/sbar.module';
import { HandoverModule } from './handover/handover.module';
import { AuthModule } from './auth/auth.module';

import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';

const TypeOrmConfig:any = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  validation: true,
  entities: ['dist/**/*.entity.js'],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    UserModule,
    HospitalModule,
    ProfileModule,
    DepartmentModule,
    UnityModule,
    PatientModule,
    SbarModule,
    HandoverModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
