
// interfaces
import { ICheckInRepository } from "@/repositories/check-ins-repository.interface";
import { CheckIn } from "@prisma/client";

interface IFetchUserCheckInHistoryRequest {
    userId: string;
    page: number;
}

interface IFetchUserCheckInHistoryResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
    constructor(
        private checkInRepository: ICheckInRepository
    ){}

    async execute({ userId, page }: IFetchUserCheckInHistoryRequest): Promise<IFetchUserCheckInHistoryResponse> {

       const checkIns = await this.checkInRepository.findManyByUserId(userId, page);

       return { checkIns }

    }
}