// dependencies
import { describe, expect, it, beforeEach } from "vitest";

// repositories
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";

// use-cases
import { RegisterCheckInUseCase } from "../register-check-in.use-case";

// error-handling

let checkInsRepository: InMemoryCheckInsRepository;
let sut: RegisterCheckInUseCase;
describe('Register CheckIn Use Case', () => {

    beforeEach(() => {
      checkInsRepository = new InMemoryCheckInsRepository()
      sut = new RegisterCheckInUseCase(checkInsRepository)
    })
  
    it('should register a check-in', async () => {
        const { checkIn } = await sut.execute({
            userId: '1234',
            gymId: '1235'
        });

        expect(checkIn.id).toEqual(expect.any(String))
    });

  })