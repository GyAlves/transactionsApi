// dependencies
import { CheckIn } from "@prisma/client";

// interfaces
import { ICheckInRepository } from "@/repositories/check-ins-repository.interface";

interface IRegisterCheckInRequest {
    userId: string;
    gymId: string;
}

interface IRegisterCheckInResponse {
    checkIn: CheckIn
}

// error handling
import { MultiplesCheckInsOnSameDayError } from "./errors/multiples-check-ins-on-same-day.error";

export class RegisterCheckInUseCase {
    constructor(
        private checkInRepository: ICheckInRepository
    ){}

    async execute({ userId, gymId }: IRegisterCheckInRequest): Promise<IRegisterCheckInResponse> {

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