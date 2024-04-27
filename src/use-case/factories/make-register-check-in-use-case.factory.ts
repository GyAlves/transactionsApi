// repositories
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";

// use-cases
import { RegisterCheckInUseCase } from "../register-check-in.use-case";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";

export function MakeRegisterCheckInUseCase () {
    const checkInsRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository();
    const registerCheckInUseCase = new RegisterCheckInUseCase(checkInsRepository, gymsRepository);

    return registerCheckInUseCase;
}