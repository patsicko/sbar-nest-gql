import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DepartmentService } from "./department.service";
import { Department } from "./entities/department.entity";
import { CreateDepartmentInput } from "./dto/create-department.input";
import { UpdateDepartmentInput } from "./dto/update-department.input";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/user/entities/user.entity";
import { RemoveDepartmentResponse } from "./dto/remove-department";

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  createDepartment(
    @Args("createDepartmentInput") createDepartmentInput: CreateDepartmentInput,
    @CurrentUser() user: User
  ) {
    if (user.role !== "admin") {
      throw new Error("Only admin can create departments");
    }
    return this.departmentService.create(createDepartmentInput, user.id);
  }

  @Query(() => [Department], { name: "getDepartments" })
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.departmentService.findAll(user.id);
  }

  @Query(() => Department, { name: "getSingleDepartment" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.departmentService.findOne(id);
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args("updateDepartmentInput") updateDepartmentInput: UpdateDepartmentInput
  ) {
    return this.departmentService.update(
      updateDepartmentInput.id,
      updateDepartmentInput
    );
  }

  @Mutation(() => RemoveDepartmentResponse)
  removeDepartment(
    @Args("id", { type: () => Int }) id: number
  ): Promise<Promise<RemoveDepartmentResponse>> {
    return this.departmentService.remove(id);
  }
}
