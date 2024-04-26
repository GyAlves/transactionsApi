// repositories
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users.repository";

// use-cases
import { RegisterUserUseCase } from "../register-customer.use-case";

export function MakeRegisterUserUseCase () {
    const usersRepository = new PrismaUserRepository();
    const registerUserUseCase = new RegisterUserUseCase(usersRepository);

    return registerUserUseCase;
}