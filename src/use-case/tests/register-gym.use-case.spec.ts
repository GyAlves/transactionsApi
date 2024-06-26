// dependencies
import { describe, expect, it, beforeEach } from "vitest";

// repositories
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

// use-cases
import { RegisterGymUseCase } from "../register-gym.use-case";

// error-handling
import { GymAlreadyExistsError } from "../errors/gym-already-exists.error";

let gymsRepository: InMemoryGymRepository;
let sut: RegisterGymUseCase;
describe('Create Gym Use Case', () => {
    beforeEach(() => {
      gymsRepository = new InMemoryGymRepository()
      sut = new RegisterGymUseCase(gymsRepository)
    })
  
    it('should be able to create a gym', async () => {
      
      const { gym } = await sut.execute({
        title: 'JavaScript Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
  
      expect(gym.id).toEqual(expect.any(String))
    });

  })