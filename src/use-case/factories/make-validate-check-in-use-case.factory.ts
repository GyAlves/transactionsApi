// repositories
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";

// use-cases
import { ValidateCheckInUseCase } from "../validate-check-in.use-case";

export function MakeRegisterCheckInUseCase () {
    const checkInsRepository = new PrismaCheckInsRepository();
    const registerCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);

    return registerCheckInUseCase;
}