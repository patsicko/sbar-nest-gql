import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs"
@Injectable()
export class CreateSuperAdminService implements OnModuleInit{

    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>
    ){}

    async onModuleInit() {
        await this.createSuperAdmin();
      }
    async createSuperAdmin():Promise<User>{
        const saltRound= await bcrypt.genSalt(10);
        const hash= await bcrypt.hash(process.env.superAdminPasssword,saltRound)
        const superAdminDto={
            firstName:process.env.superAdminFirstName,
            lastName:process.env.superAdminLastName,
            email:process.env.superAdminEmail,
            password:hash,
            role:process.env.superAdminRole,
            approved: true,

        }
        const existingSuperAdmin=await this.userRepository.findOne({where:{email:superAdminDto.email}})
        if(!existingSuperAdmin){
            const superAdmin = this.userRepository.create(superAdminDto);
            console.log(`${superAdmin.role} ${superAdmin.lastName}, created successfully`)

           return  await this.userRepository.save(superAdmin)
        }
        console.log(`${existingSuperAdmin.role} ${existingSuperAdmin.lastName}, arleady exist`)
      return existingSuperAdmin
        
    }
}