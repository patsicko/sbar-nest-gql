import { Test, TestingModule } from '@nestjs/testing';
import { SbarResolver } from './sbar.resolver';
import { SbarService } from './sbar.service';

describe('SbarResolver', () => {
  let resolver: SbarResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SbarResolver, SbarService],
    }).compile();

    resolver = module.get<SbarResolver>(SbarResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
