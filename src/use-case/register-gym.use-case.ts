// dependencies
import { Gym } from "@prisma/client";

// interfaces
import { IGymsRepository } from "@/repositories/gyms-repository.interface";

interface ICreateGymRequest {
    title: string;
    description?: string;
    phone?: string;
    latitude: number;
    longitude: number;
}

interface ICreateGymResponse {
    gym: Gym;
}

// error-handling

export class RegisterGymUseCase {
    constructor(
        private gymsRepository: IGymsRepository
    ){}

    async execute({ title, description, phone, latitude, longitude }:ICreateGymRequest): Promise<ICreateGymResponse>{
                
        const gym = await this.gymsRepository.create(
            {
                title: title.toLowerCase().trim(),
                description,
                phone,
                latitude,
                longitude,
            }
        )

        return { gym };

    }
}