
// repositories
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'

// use-cases
import { GetUserMetricsUseCase } from '../get-user-metrics.use-case';

export function MakeGetUserMetricsUseCase() {

    const checkInsRepository = new PrismaCheckInsRepository();
    const getUserProfileUseCase = new GetUserMetricsUseCase(checkInsRepository);

    return getUserProfileUseCase;
    
}