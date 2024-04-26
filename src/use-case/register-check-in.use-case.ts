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

export class RegisterCheckInUseCase {
    constructor(
        private checkInRepository: ICheckInRepository
    ){}

    async execute({ userId, gymId }: IRegisterCheckInRequest): Promise<IRegisterCheckInResponse> {

        const checkIn = await this.checkInRepository.create(
            {
                user_id: userId,
                gym_id: gymId,
            }
        );

        return { checkIn };

    }
}