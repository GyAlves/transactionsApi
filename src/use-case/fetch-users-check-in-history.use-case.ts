
// interfaces
import { ICheckInRepository } from "@/repositories/check-ins-repository.interface";

interface IGetUserMetricsRequest {
    userId: string;
}

interface IGetUserMetricsResponse {
    checkInsCount: number
}

export class FetchUserCheckInHistoryUseCase {
    constructor(
        private checkInRepository: ICheckInRepository
    ){}

    async execute({ userId }: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {

        const checkInsCount = await this.checkInRepository.countByUserId(userId);

        return { checkInsCount }

    }
}