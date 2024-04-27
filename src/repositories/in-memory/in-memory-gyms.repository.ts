//dependencies
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

//interfaces
import { FindNearbyGymsParams, IGymsRepository } from "../gyms-repository.interface";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.utils";

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

    async findManyNearby(params: FindNearbyGymsParams) {
        const gyms = this.items.filter(item => {

            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
            )

            return distance < 10;
        })

        return gyms;
    }
    
}