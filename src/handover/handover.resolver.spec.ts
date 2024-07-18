import { Test, TestingModule } from "@nestjs/testing";
import { HandoverResolver } from "./handover.resolver";
import { HandoverService } from "./handover.service";

describe("HandoverResolver", () => {
  let resolver: HandoverResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandoverResolver, HandoverService]
    }).compile();

    resolver = module.get<HandoverResolver>(HandoverResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
