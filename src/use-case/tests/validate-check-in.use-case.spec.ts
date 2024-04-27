// dependencies
import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";

// repositories
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

// use-cases
import { ValidateCheckInUseCase } from "../validate-check-in.use-case";

// error-handling
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymRepository
let sut: ValidateCheckInUseCase;
describe('Register CheckIn Use Case', () => {

    beforeEach(() => {
      checkInsRepository = new InMemoryCheckInsRepository();
      gymsRepository = new InMemoryGymRepository();
      sut = new ValidateCheckInUseCase(checkInsRepository);
    })

    it('should register a check-in', async () => {

      const gym = await gymsRepository.create({
        id: "gym-id",
        title: 'JavaScript Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

      const checkInCreated = await checkInsRepository.create({
        gym_id: gym.id,
        user_id: '1234',
      });

      const { checkIn: checkInValidated } = await sut.execute({ checkInId: checkInCreated.id});

      expect(checkInValidated.id).toEqual(expect.any(String))
    });

    it('should not be able to register a non-existent check-in', async () => {
        expect( async () => {
            await sut.execute({ checkInId: 'non-existent' });
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    });

})