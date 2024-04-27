// dependencies
import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";

// repositories
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";

// use-cases
import { RegisterCheckInUseCase } from "../register-check-in.use-case";

// error-handling
import { MultiplesCheckInsOnSameDayError } from "../errors/multiples-check-ins-on-same-day.error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: RegisterCheckInUseCase;
describe('Register CheckIn Use Case', () => {

    beforeEach(() => {
      checkInsRepository = new InMemoryCheckInsRepository();
      sut = new RegisterCheckInUseCase(checkInsRepository);

      vi.useFakeTimers();
    })

    afterEach(() => {
      vi.useRealTimers();
    })
  
    it('should register a check-in', async () => {
        const { checkIn } = await sut.execute({
            userId: '1234',
            gymId: '1235'
        });

        expect(checkIn.id).toEqual(expect.any(String))
    });

    it('should not be able to register twice in the same day', async () => {

      vi.setSystemTime(new Date(20220,0,20, 8,0,0));

      await sut.execute({
        userId: '1234',
        gymId: '1236'
      });

      await expect(async () => {
        await sut.execute({
          userId: '1234',
          gymId: '1236'
        });
      }).rejects.toBeInstanceOf(MultiplesCheckInsOnSameDayError);

    });

    it('should be able to have multiple check-ins but on different days', async () => {

      vi.setSystemTime(new Date(20220,0,20, 8,0,0));

      await sut.execute({
        userId: '1234',
        gymId: '1236'
      });

      vi.setSystemTime(new Date(20220,0,22, 8,0,0));

      const { checkIn } = await sut.execute({
        userId: '12354',
        gymId: '1235'
    });

    expect(checkIn.id).toEqual(expect.any(String))

    });

  })