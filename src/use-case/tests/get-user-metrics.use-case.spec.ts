// dependencies
import { describe, expect, it, beforeEach } from "vitest";

// repositories
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";

// use-cases
import { GetUserMetricsUseCase } from "../get-user-metrics.use-case";

// error-handling

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;
describe('Get User Metrics', () => {

    beforeEach(() => {
      checkInsRepository = new InMemoryCheckInsRepository()
      sut = new GetUserMetricsUseCase(checkInsRepository)
    })
  
    it('should get all user check-ins count', async () => {

        await checkInsRepository.create({
            user_id: '1234',
            gym_id: '1234'
        })

        await checkInsRepository.create({
            user_id: '1234',
            gym_id: '6789'
        })

        const { checkInsCount } = await sut.execute({
            userId: '1234',
        });

        expect(checkInsCount).toEqual(2)
    });

  })