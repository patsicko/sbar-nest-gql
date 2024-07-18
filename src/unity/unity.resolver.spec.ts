import { Test, TestingModule } from "@nestjs/testing";
import { UnityResolver } from "./unity.resolver";
import { UnityService } from "./unity.service";

describe("UnityResolver", () => {
  let resolver: UnityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnityResolver, UnityService]
    }).compile();

    resolver = module.get<UnityResolver>(UnityResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
