import { Test, TestingModule } from '@nestjs/testing';
import { HandoverService } from './handover.service';

describe('HandoverService', () => {
  let service: HandoverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandoverService],
    }).compile();

    service = module.get<HandoverService>(HandoverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
