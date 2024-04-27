// dependencies
import { describe, expect, it, beforeEach } from "vitest";

// repositories
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

// use-cases
import { FetchUserNearbyGymsUseCase } from "../fetch-nearby-gyms.use-case";

// error-handling

let gymsRepository: InMemoryGymRepository;
let sut: FetchUserNearbyGymsUseCase;
describe('Fetch nearby Gyms Use Case', () => {
    beforeEach(() => {
      gymsRepository = new InMemoryGymRepository()
      sut = new FetchUserNearbyGymsUseCase(gymsRepository)
    })
  
    it('should be able to fetch gyms within valid range', async () => {

      await gymsRepository.create({
        title: 'Near Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

      await gymsRepository.create({
        title: 'Far Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -23.3916028,
        longitude: -46.4296952,
      })

      const { gyms } = await sut.execute({
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
      
      expect(gyms).toHaveLength(1);
      expect(gyms).toEqual([
        expect.objectContaining({ title: 'Near Gym' }),
      ]); 

    });

    it.skip('should be able to fetch paginated nearby gyms', async () => {

      for(let i = 1; i <= 22; i++) {

        await gymsRepository.create({
          title: `JavaScript Gym-${i}`,
          description: "Gym description",
          phone: "phone",
          latitude: -27.2092052,
          longitude: -49.6401091,
        })

      }

      const { gyms } = await sut.execute({
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
      
      expect(gyms).toHaveLength(2);

      expect(gyms).toEqual([
        expect.objectContaining({ title: 'JavaScript Gym-21' }),
        expect.objectContaining({ title: 'JavaScript Gym-22' }),
      ]); 

    });

  })