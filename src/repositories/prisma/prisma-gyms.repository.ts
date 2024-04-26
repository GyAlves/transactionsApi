// dependencies
import { prisma as prismaDatabase } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// interfaces
import { IGymsRepository } from "../gyms-repository.interface";

export class PrismaGymRepository implements IGymsRepository  {
    async findById(id: string) {
        // const user = await prismaDatabase.user.findUnique({
        //     where: { id }
        // });
        // return user;
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = await prismaDatabase.gym.create({ data });
        return gym;
    }
}
