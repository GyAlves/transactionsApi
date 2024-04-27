// dependencies
import { describe, expect, it, beforeEach } from "vitest";

// repositories
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

// use-cases
import { FindGymByNameUseCase } from "../search-gym.use-case";

// error-handling

let gymsRepository: InMemoryGymRepository;
let sut: FindGymByNameUseCase;
describe('Search Gym Use Case', () => {
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

      await gymsRepository.create({
        title: 'Typescript Gym',
        description: "Gym description",
        phone: "phone",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

      const { gyms } = await sut.execute({
        query: "JavaScript Gym",
        page: 1
      })
      
      expect(gyms).toHaveLength(1);
      expect(gyms).toEqual([
        expect.objectContaining({ title: 'JavaScript Gym' }),
      ]); 

    });

    it('should be able to fetch paginated gym search', async () => {

      for(let i = 1; i <= 22; i++) {

        await gymsRepository.create({
          title: `JavaScript Gym ${i}`,
          description: "Gym description",
          phone: "phone",
          latitude: -27.2092052,
          longitude: -49.6401091,
        })

      }

      const { gyms } = await sut.execute({
        query: "JavaScript",
        page: 2
      })
      
      expect(gyms).toHaveLength(2);

      expect(gyms).toEqual([
        expect.objectContaining({ title: 'JavaScript Gym 21' }),
        expect.objectContaining({ title: 'JavaScript Gym 22' }),
      ]); 

    });

  })