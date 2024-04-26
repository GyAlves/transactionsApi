// repositories
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";

// use-cases
import { RegisterCheckInUseCase } from "../register-check-in.use-case";

export function MakeRegisterCheckInUseCase () {
    const checkInsRepository = new PrismaCheckInsRepository();
    const registerCheckInUseCase = new RegisterCheckInUseCase(checkInsRepository);

    return registerCheckInUseCase;
}