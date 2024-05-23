// repositories
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";

// use-cases
import { FindGymByNameUseCase } from "../search-gym.use-case";

export function MakeSearchGymUseCase () {
    const checkInsRepository = new PrismaGymsRepository();
    const registerCheckInUseCase = new FindGymByNameUseCase(checkInsRepository);

    return registerCheckInUseCase;
}