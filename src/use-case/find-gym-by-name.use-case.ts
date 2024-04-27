// dependencies
import { Gym } from "@prisma/client";

// interfaces
import { IGymsRepository } from "@/repositories/gyms-repository.interface";

interface IFindGymByNameRequest {
    name: string;
}

interface IFindGymByNameResponse {
    gym: Gym | null;
}

// error-handling

export class FindGymByNameUseCase {
    constructor(
        private gymsRepository: IGymsRepository
    ){}

    async execute({ name }: IFindGymByNameRequest): Promise<IFindGymByNameResponse>{
                
        const gym = await this.gymsRepository.findByName(name);
        return { gym };

    }
}