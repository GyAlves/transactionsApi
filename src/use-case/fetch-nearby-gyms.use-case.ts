
// interfaces
import { IGymsRepository } from "@/repositories/gyms-repository.interface";
import { Gym } from "@prisma/client";

interface IFetchNearbyGymsRequest {
    userLatitude: string;
    userLongitude: string;
}

interface IFetchNearbyGymsResponse {
    gyms: Gym[]
}

export class FetchUserNearbyGymsUseCase {
    constructor(
        private gymsRepository: IGymsRepository
    ){}

    async execute({ userLatitude, userLongitude }: IFetchNearbyGymsRequest): Promise<IFetchNearbyGymsResponse> {

       const gyms = await this.gymsRepository.findManyNearby(
        {
            latitude: Number(userLatitude),
            longitude: Number(userLongitude)
        }
       );

       return { gyms }

    }
}