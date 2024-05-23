// dependencies
import { prisma as prismaDatabase } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";

// interfaces
import { FindNearbyGymsParams, IGymsRepository } from "../gyms-repository.interface";

export class PrismaGymsRepository implements IGymsRepository  {
    async searchMany(query: string, page: number): Promise<Gym[]> {

        return await prismaDatabase.gym.findMany({
            where:{
                title: {
                    contains: query
                }
            },
            skip: (page - 1) * 22,
            take: 22
        });

    }
    async findManyNearby({ longitude, latitude }: FindNearbyGymsParams): Promise<Gym[]> {

        return await prismaDatabase.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) 
                * cos( radians( latitude ) ) 
                * cos( radians( longitude ) - radians(${longitude}) ) 
                + sin( radians(${latitude}) ) 
                * sin( radians( latitude ) ) ) 
            ) <= 10
        `
    }
    async findById(id: string) {
        return await prismaDatabase.gym.findUnique({
            where: { id }
        });
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = await prismaDatabase.gym.create({ data });
        return gym;
    }
}
