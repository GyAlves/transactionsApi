//dependencies
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

//interfaces
import { IGymsRepository } from "../gyms-repository.interface";

export class InMemoryGymRepository implements IGymsRepository {

    public items: Gym[] = [];
    async create(data: Prisma.GymCreateInput) {

        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            phone: data.phone ?? null,
            created_at: new Date(),
        }

        this.items.push(gym);

        return gym;
        
    }

    async findByLocation(latitude: Prisma.Decimal, longitude: Prisma.Decimal) {
        
        const gym = this.items
         .find( gym => gym.latitude === latitude && gym.longitude === longitude);

        if (!gym) return null;
        
        return gym;
    }

    async searchMany(query: string, page:number) {
        const gyms = this.items
            .filter(gym => gym.title.includes(query))
            .slice((page - 1) * 20, page + 20)

        return gyms;
    }

    async findById(id: string) {
        const gym = this.items.find(gym => gym.id === id);
        return gym || null;
    }
    
}