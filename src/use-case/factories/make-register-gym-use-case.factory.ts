// repositories
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";

// use-cases
import { RegisterGymUseCase } from "../register-gym.use-case";

export function MakeRegisterGymUseCase(){
    const usersRepository = new PrismaGymsRepository ();
    const registerGymUseCase = new RegisterGymUseCase(usersRepository);

    return registerGymUseCase;
}