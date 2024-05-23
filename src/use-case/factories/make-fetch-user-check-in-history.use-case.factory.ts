
// repositories
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'

// use-cases
import { FetchUserCheckInHistoryUseCase } from '../fetch-users-check-in-history.use-case';
export function MakeFetchUserCheckInHistoryUseCase () {
    const checkInsRepository = new PrismaCheckInsRepository();
    const fetchUserCheckInHistoryUseCase = new FetchUserCheckInHistoryUseCase(checkInsRepository);
    return fetchUserCheckInHistoryUseCase;
}