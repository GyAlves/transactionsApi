// dependencies
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client';

//interfaces
import { IUsersRepository } from '@/repositories/users-repository.interface';
interface IRegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface IRegisterUseCaseResponse {
    user: User;
}

// error-handling
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

export class RegisterUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {}
    async execute({ name, email, password }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new UserAlreadyExistsError();
        }
        
        const password_hash = await bcrypt.hash(password, 6);

        const user = await this.usersRepository.create({ name, email, password_hash });

        return { user };

    }
}