// dependencies
import { describe, it, expect, beforeEach } from "vitest";
import { hash } from "bcryptjs";

// repositories
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users.repository";

// use-cases
import { AuthenticateUserUseCase } from "../authenticate-user.use-case";

// error-handling
import { InvalidUserCredentialsError } from "../errors/invalid-user-credentials.error";

let usersRepository: InMemoryUserRepository;
let sut: AuthenticateUserUseCase;

describe('Authenticate User Case', () => {

    beforeEach(() => {
        usersRepository =  new InMemoryUserRepository();
        sut = new AuthenticateUserUseCase(usersRepository);
    });

    it('should be able to authenticate', async () => {

        await usersRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const { user} = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String));

    });

    it('should not be able to authenticate with wrong email', async () => {

        expect(async () => {
            await sut.execute({
                email: 'johndoe@example.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(InvalidUserCredentialsError)

    });

    it('should not be able to authenticate with wrong password', async () => {

        await usersRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        await expect( async () => {
            await sut.execute({
                email: 'johndoe@example.com',
                password: '123457'
            })
        }).rejects.toBeInstanceOf(InvalidUserCredentialsError)

    });
});

