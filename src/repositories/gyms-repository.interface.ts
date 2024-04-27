import { Gym, Prisma } from "@prisma/client";

export interface FindNearbyGymsParams {
    latitude: number;
    longitude: number;
}

export interface IGymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    searchMany(title: string, page:number): Promise<Gym[]>
    findById(id: string): Promise<Gym | null>
    findManyNearby(params: FindNearbyGymsParams): Promise<Gym[]>
}