import { Gym, Prisma } from "@prisma/client";

export interface IGymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    searchMany(title: string, page:number): Promise<Gym[]>
    findById(id: string): Promise<Gym | null>
}