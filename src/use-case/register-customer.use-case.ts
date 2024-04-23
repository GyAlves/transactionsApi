// dependencies
import bcrypt from 'bcryptjs'

//interfaces
import { IUsersRepository } from '@/repositories/users-repository.interface';
interface IRegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

// error-handling
import { UserAlreadyExists } from './errors/user-already-exists.error';

export class RegisterUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {}
    async execute({ name, email, password }: IRegisterUseCaseRequest) {

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new UserAlreadyExists();
        }
        
        const password_hash = await bcrypt.hash(password, 6);

        await this.usersRepository.create({ name, email, password_hash });

    }
}