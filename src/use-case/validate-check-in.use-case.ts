// dependencies
import { CheckIn } from "@prisma/client";

// interfaces
import { ICheckInRepository } from "@/repositories/check-ins-repository.interface";

interface IValidateCheckInRequest {
    checkInId: string;
}

interface IValidateCheckInResponse {
    checkIn: CheckIn
}

// error handling
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

export class ValidateCheckInUseCase {
    constructor(
        private checkInRepository: ICheckInRepository
    ){}

    async execute({ checkInId }: IValidateCheckInRequest): Promise<IValidateCheckInResponse> {

        const checkIn = await this.checkInRepository.findById(checkInId);

        if(!checkIn) {
            throw new ResourceNotFoundError();
        }

        checkIn.validated_at = new Date();

        await this.checkInRepository.validateCheckIn(checkIn);

        return { checkIn }

    }
}