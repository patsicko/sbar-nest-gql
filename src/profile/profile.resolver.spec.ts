import { Test, TestingModule } from "@nestjs/testing";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

describe("ProfileResolver", () => {
  let resolver: ProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileResolver, ProfileService]
    }).compile();

    resolver = module.get<ProfileResolver>(ProfileResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
