// dependencies
import { Gym } from "@prisma/client";

// interfaces
import { IGymsRepository } from "@/repositories/gyms-repository.interface";

interface IFindGymByNameRequest {
    query: string;
    page: string;
}

interface IFindGymByNameResponse {
    gyms: Gym[];
}

// error-handling

export class FindGymByNameUseCase {
    constructor(
        private gymsRepository: IGymsRepository
    ){}

    async execute({ query, page }: IFindGymByNameRequest): Promise<IFindGymByNameResponse>{
                
        const gyms = await this.gymsRepository.searchMany(query, Number(page));
        return { gyms };

    }
}