// dependencies
import { describe, it, expect } from "vitest";
import { compare } from 'bcryptjs';

// repository
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users.repository";

// use-cases
import { RegisterUserUseCase } from "./register-customer.use-case";

// error-handling
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";

describe('Register User Case', () => {

    it('should be able to register user', async () => {
        const prismaUserRepository = new InMemoryUserRepository();
        const registerUserCase = new RegisterUserUseCase(prismaUserRepository);
 
        const { user } = await registerUserCase.execute({
         name: 'John Doe',
         email: 'johndoe@email.com', 
         password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
     });

    it('should be able to hash password upon registration', async () => {
       const prismaUserRepository = new InMemoryUserRepository();
       const registerUserCase = new RegisterUserUseCase(prismaUserRepository);

       const { user } = await registerUserCase.execute({
        name: 'John Doe',
        email: 'johndoe@email.com', 
        password: '123456'
       });

       const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);
       expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register use with same email twice', async () => {
        const prismaUserRepository = new InMemoryUserRepository();
        const registerUserCase = new RegisterUserUseCase(prismaUserRepository);
         
        const email = 'johndoe@email.com';

        await registerUserCase.execute({
         name: 'John Doe',
         email, 
         password: '123456'
        });

        await expect(() => 
            registerUserCase.execute({
             name: 'John Doe',
             email, 
             password: '123456'
            }) 
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

     });
});