import { Logger, Module } from '@nestjs/common';

import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { HospitalModule } from './hospital/hospital.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({

      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gql',
  
      synchronize: true,
      entities: ["dist/**/*.entity.js"],
      
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile:join(process.cwd(),'src/schema.gql'),
    }),
    UserModule,
    HospitalModule
  ],
 
  providers: [AppService],
})
export class AppModule {
  constructor() {
    this.logEntityLoading();
  }

  private logEntityLoading() {
    const entities = TypeOrmModule.forRoot().imports[0] || [];
    Logger.log('Entities to be loaded:',entities);
   
  }
}
