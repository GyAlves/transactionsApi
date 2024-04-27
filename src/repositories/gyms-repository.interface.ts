import { Gym, Prisma } from "@prisma/client";

export interface IGymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findByName(name: string): Promise<Gym | null>
    findById(id: string): Promise<Gym | null>
    // findByLocation(latitude: Prisma.Decimal, logitude: Prisma.Decimal): Promise<Gym | null>
}