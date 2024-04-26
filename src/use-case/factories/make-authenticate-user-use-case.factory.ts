
// repositories
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users.repository'

// use-cases
import { AuthenticateUserUseCase } from '../authenticate-user.use-case';
export function MakeAuthenticateUserUseCase () {
    const usersRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUserUseCase(usersRepository);

    return authenticateUseCase;
}