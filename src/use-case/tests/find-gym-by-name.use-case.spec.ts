// dependencies
import { describe, expect, it, beforeEach } from "vitest";

// repositories
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

// use-cases
import { FindGymByNameUseCase } from "../find-gym-by-name.use-case";

// error-handling

let gymsRepository: InMemoryGymRepository;
let sut: FindGymByNameUseCase;
describe('Find Gym By Name Use Case', () => {
    beforeEach(() => {
      gymsRepository = new InMemoryGymRepository()
      sut = new FindGymByNameUseCase(gymsRepository)
    })
  
    it('should find a gym by its name', async () => {

      await gymsRepository.create({
        title: 'JavaScript Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

      const { gym } = await sut.execute({
        name: "JavaScript Gym"
      })
      
      expect(gym?.id).toEqual(expect.any(String))
    });

  })