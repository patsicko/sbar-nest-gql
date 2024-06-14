import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SbarService } from './sbar.service';
import { Sbar } from './entities/sbar.entity';
import { CreateSbarInput } from './dto/create-sbar.input';
import { UpdateSbarInput } from './dto/update-sbar.input';

@Resolver(() => Sbar)
export class SbarResolver {
  constructor(private readonly sbarService: SbarService) {}

  @Mutation(() => Sbar)
  createSbar(@Args('createSbarInput') createSbarInput: CreateSbarInput) {
    return this.sbarService.create(createSbarInput);
  }

  @Query(() => [Sbar], { name: 'sbar' })
  findAll() {
    return this.sbarService.findAll();
  }

  @Query(() => Sbar, { name: 'sbar' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sbarService.findOne(id);
  }

  @Mutation(() => Sbar)
  updateSbar(@Args('updateSbarInput') updateSbarInput: UpdateSbarInput) {
    return this.sbarService.update(updateSbarInput.id, updateSbarInput);
  }

  @Mutation(() => Sbar)
  removeSbar(@Args('id', { type: () => Int }) id: number) {
    return this.sbarService.remove(id);
  }
}
