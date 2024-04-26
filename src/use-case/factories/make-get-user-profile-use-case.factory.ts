
// repositories
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users.repository'

// use-cases
import { AuthenticateUserUseCase } from '../../use-case/authenticate-user.use-case';
import { GetUserProfileUseCase } from '../get-user-profile.use-case';

export function MakeGetUserProfileUseCase() {

    const usersRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUserUseCase(usersRepository);
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

    return getUserProfileUseCase;
    
}