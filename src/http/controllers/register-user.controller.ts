// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// repositories
import { PrismaUserRepository } from '../../repositories/prisma/prisma-users.repository'

// use-cases
import { RegisterUserUseCase } from '../../use-case/register-customer.use-case';

// error-handling
import {  UserAlreadyExistsError } from '@/use-case/errors/user-already-exists.error';

export async function RegisterUserController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const usersRepository = new PrismaUserRepository();
        const registerUserUseCase = new RegisterUserUseCase(usersRepository)

        const registerUserBodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        });

        const { name, email, password } = registerUserBodySchema.parse(request.body);

        await registerUserUseCase.execute({ name, email, password });

        reply.status(201).send({message: 'User created successfully'})

    } catch (error) {
        
        if(error instanceof UserAlreadyExistsError) {
            reply.status(409).send({ error: error.message })
        }

        reply.status(400).send(error)
    }

}