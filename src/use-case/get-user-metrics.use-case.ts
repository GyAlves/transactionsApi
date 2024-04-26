
// interfaces
import { ICheckInRepository } from "@/repositories/check-ins-repository.interface";

interface IGetUserMetricsRequest {
    userId: string;
}

interface IGetUserMetricsResponse {
    checkIns: number
}

export class GetUserMetricsUseCase {
    constructor(
        private checkInRepository: ICheckInRepository
    ){}

    async execute({ userId }: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {

        const checkIns = await this.checkInRepository.countByUserId(userId);

        return { checkIns }

    }
}