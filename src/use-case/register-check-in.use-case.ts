// dependencies
import { CheckIn } from "@prisma/client";

// interfaces
import { ICheckInRepository } from "@/repositories/check-ins-repository.interface";
import { IGymsRepository } from '@/repositories/gyms-repository.interface';
interface IRegisterCheckInRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface IRegisterCheckInResponse {
    checkIn: CheckIn
}

// UTILS
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.utils";

// error handling
import { MultiplesCheckInsOnSameDayError } from "./errors/multiples-check-ins-on-same-day.error";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { GymIsOutOfCheckInRangeError } from "./errors/gym-is-out-of-check-in-range.error";

export class RegisterCheckInUseCase {
    constructor(
        private checkInRepository: ICheckInRepository,
        private gymsRepository: IGymsRepository
    ){}

    async execute({ userId, gymId, userLatitude, userLongitude }: IRegisterCheckInRequest): Promise<IRegisterCheckInResponse> {

        const gym = await this.gymsRepository.findById(gymId);

        if(!gym) {
            throw new ResourceNotFoundError();
        }

        const gymDistance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KM = 0.1

        if(gymDistance > MAX_DISTANCE_IN_KM) {
            throw new GymIsOutOfCheckInRangeError()
        }
        
        const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkInOnSameDate) {
            throw new MultiplesCheckInsOnSameDayError()
        }

        const checkIn = await this.checkInRepository.create(
            {
                user_id: userId,
                gym_id: gymId,
            }
        );

        return { checkIn };

    }
}