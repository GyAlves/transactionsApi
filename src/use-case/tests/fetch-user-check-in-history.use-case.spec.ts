// dependencies
import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";

// repositories
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";

// use-cases
import { FetchUserCheckInHistoryUseCase } from "../fetch-users-check-in-history.use-case";

// error-handling

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInHistoryUseCase;
describe('Fetch User CheckIn History', () => {

    beforeEach(() => {
      checkInsRepository = new InMemoryCheckInsRepository();
      sut = new FetchUserCheckInHistoryUseCase(checkInsRepository);
    })

    it('should fetch all user check-ins', async () => {

       await checkInsRepository.create({
         user_id: '1234',
         gym_id: '1234'
       });

       await checkInsRepository.create({
        user_id: '1234',
        gym_id: '1236'
      });

       const { checkIns } = await sut.execute({ userId: '1234', page: 1 }); 

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id: '1234'}),
            expect.objectContaining({gym_id: '1236'})
        ]);
    });

    it('should fetch paginated user check-ins', async () => {

        for(let i = 1; i <= 22; i++){
            await checkInsRepository.create({
                user_id: '1234',
                gym_id: `gym-${i}`
            });
        }
 
        const { checkIns } = await sut.execute({ userId: '1234', page: 2 }); 
 
         expect(checkIns).toHaveLength(2);
         expect(checkIns).toEqual([
             expect.objectContaining({gym_id: 'gym-21'}),
             expect.objectContaining({gym_id: 'gym-22'})
         ]);
     });
  })