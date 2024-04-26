import { Gym, Prisma } from "@prisma/client";

export interface IGymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    // findByLocation(latitude: Prisma.Decimal, logitude: Prisma.Decimal): Promise<Gym | null>
}