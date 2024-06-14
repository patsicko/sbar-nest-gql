import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UnityService } from './unity.service';
import { Unity } from './entities/unity.entity';
import { CreateUnityInput } from './dto/create-unity.input';
import { UpdateUnityInput } from './dto/update-unity.input';

@Resolver(() => Unity)
export class UnityResolver {
  constructor(private readonly unityService: UnityService) {}

  @Mutation(() => Unity)
  createUnity(@Args('createUnityInput') createUnityInput: CreateUnityInput) {
    return this.unityService.create(createUnityInput);
  }

  @Query(() => [Unity], { name: 'unity' })
  findAll() {
    return this.unityService.findAll();
  }

  @Query(() => Unity, { name: 'unity' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.unityService.findOne(id);
  }

  @Mutation(() => Unity)
  updateUnity(@Args('updateUnityInput') updateUnityInput: UpdateUnityInput) {
    return this.unityService.update(updateUnityInput.id, updateUnityInput);
  }

  @Mutation(() => Unity)
  removeUnity(@Args('id', { type: () => Int }) id: number) {
    return this.unityService.remove(id);
  }
}
