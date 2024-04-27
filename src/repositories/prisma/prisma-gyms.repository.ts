// dependencies
import { prisma as prismaDatabase } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// interfaces
import { IGymsRepository } from "../gyms-repository.interface";

export class PrismaGymsRepository implements IGymsRepository  {
    async findByName(name: string) {
        // const gym = await prismaDatabase.gym.findUnique({
        //     where: { title: name }
        // });
        // return gym;
    }
    async findById(id: string) {
        const gym = await prismaDatabase.gym.findUnique({
            where: { id }
        });
        return gym;
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = await prismaDatabase.gym.create({ data });
        return gym;
    }
}
