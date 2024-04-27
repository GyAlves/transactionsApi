// dependencies
import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";

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
import { LateCheckInValidationError } from "./errors/late-check-in-validation.error";

export class ValidateCheckInUseCase {
    constructor(
        private checkInRepository: ICheckInRepository
    ){}

    async execute({ checkInId }: IValidateCheckInRequest): Promise<IValidateCheckInResponse> {

        const checkIn = await this.checkInRepository.findById(checkInId);

        if(!checkIn) {
            throw new ResourceNotFoundError();
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date())
            .diff(checkIn.created_at, 'minutes');

        if(distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError();
        }

        checkIn.validated_at = new Date();

        await this.checkInRepository.validateCheckIn(checkIn);

        return { checkIn }

    }
}