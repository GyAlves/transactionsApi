//dependencies
import bcryptjs from "bcryptjs";
import { User } from "@prisma/client";

// repositories
import { IUsersRepository } from "@/repositories/users-repository.interface";

// interfaces
interface IAuthenticateUserRequest {
    email: string;
    password: string;
}

interface IAuthenticateUserResponses {
    user: User;
}

// error
import { InvalidUserCredentialsError } from "./errors/invalid-user-credentials.error";
import { env } from "@/env";

export class AuthenticateUserUseCase {

    constructor(
        private usersRepository: IUsersRepository
    ){}
    async execute({ email, password }: IAuthenticateUserRequest ): Promise<IAuthenticateUserResponses> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new InvalidUserCredentialsError();
        }

        const isPasswordsMatching = await bcryptjs.compare(password, user.password_hash);

        if(!isPasswordsMatching) {
            throw new InvalidUserCredentialsError();
        }

        return { user };

    }
}