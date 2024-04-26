// dependencies
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";

// repositories
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users.repository";

// use-cases
import { GetUserProfileUseCase } from '@/use-case/get-user-profile.use-case';

// error-handling
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

let usersRepository: InMemoryUserRepository;
let stu: GetUserProfileUseCase;

describe('User Profile Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        stu = new GetUserProfileUseCase(usersRepository);
    })

    it('should list user profile', async () => {

        const user = await usersRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        });

        const { user: doesUserExists } = await stu.execute({ userId: user.id });

        expect(doesUserExists.id).toEqual(user.id);
    });

    it('should not be able to get user profile with wrong id', async () => {

        expect(async () => {
            await stu.execute({ userId: '1234' })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    });
})