
// repositories
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository';

// use-cases
import { FetchUserNearbyGymsUseCase } from '../fetch-nearby-gyms.use-case';
export function MakeFetchNearbyGymsUseCase () {
    const gymsRepository = new PrismaGymsRepository();
    const fetchNearbyGymsUseCase = new FetchUserNearbyGymsUseCase(gymsRepository);
    return fetchNearbyGymsUseCase;
}