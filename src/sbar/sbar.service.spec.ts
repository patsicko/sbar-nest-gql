import { Test, TestingModule } from '@nestjs/testing';
import { SbarService } from './sbar.service';

describe('SbarService', () => {
  let service: SbarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SbarService],
    }).compile();

    service = module.get<SbarService>(SbarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
