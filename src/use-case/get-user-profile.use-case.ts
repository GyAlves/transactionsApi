// dependencies
import { User } from "@prisma/client";

// interfaces
import { IUsersRepository } from "@/repositories/users-repository.interface";

interface IGetUserProfileRequest {
    userId: string;
}

interface IGetUserProfileResponse {
    user: User;
}

// error-handling
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

export class GetUserProfileUseCase {
    constructor(
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ userId }: IGetUserProfileRequest): Promise<IGetUserProfileResponse> {

        const user = await this.usersRepository.findById(userId);

        if(!user) {
            throw new ResourceNotFoundError();
        }

        return { user }

    }
}