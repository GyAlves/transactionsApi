// dependencies
import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";

// repositories
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

// use-cases
import { RegisterCheckInUseCase } from "../register-check-in.use-case";

// error-handling
import { MultiplesCheckInsOnSameDayError } from "../errors/multiples-check-ins-on-same-day.error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymRepository
let sut: RegisterCheckInUseCase;
describe('Register CheckIn Use Case', () => {

    beforeEach(() => {
      checkInsRepository = new InMemoryCheckInsRepository();
      gymsRepository = new InMemoryGymRepository();
      sut = new RegisterCheckInUseCase(checkInsRepository, gymsRepository);

      vi.useFakeTimers();
    })

    afterEach(() => {
      vi.useRealTimers();
    })
  
    it('should register a check-in', async () => {

      await gymsRepository.create({
        id: "gym-id",
        title: 'JavaScript Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

        const { checkIn } = await sut.execute({
            userId: '1234',
            gymId: 'gym-id',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        });

        expect(checkIn.id).toEqual(expect.any(String))
    });

    it('should not be able to register twice in the same day', async () => {

      await gymsRepository.create({
        id: "gym-id",
        title: 'JavaScript Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

      vi.setSystemTime(new Date(20220,0,20, 8,0,0));

      const { checkIn } = await sut.execute({
        userId: '1234',
        gymId: 'gym-id',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
       });

      await expect(async () => {
        await sut.execute({
          userId: '1234',
          gymId: 'gym-id',
          userLatitude: -27.2092052,
          userLongitude: -49.6401091,
        });
      }).rejects.toBeInstanceOf(MultiplesCheckInsOnSameDayError);

    });

    it('should be able to have multiple check-ins but on different days', async () => {

      await gymsRepository.create({
        id: "gym-id",
        title: 'JavaScript Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

      vi.setSystemTime(new Date(20220,0,20, 8,0,0));

      await sut.execute({
        userId: '1234',
        gymId: 'gym-id',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      });

      vi.setSystemTime(new Date(20220,0,22, 8,0,0));

      const { checkIn } = await sut.execute({
        userId: '1234',
        gymId: 'gym-id',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      });

     expect(checkIn.id).toEqual(expect.any(String))

    });

    it('should not be able to register a check-in on distant gym', async () => {

      await gymsRepository.create({
        id: "gym-id",
        title: 'JavaScript Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

     await expect(async () => {
        await sut.execute({
          userId: '1234',
          gymId: 'gym-id',
          userLatitude: -23.3916028,
          userLongitude: -46.4296952,
        });
      }).rejects.toBeInstanceOf(Error)

    });

  })