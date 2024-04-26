// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// factories
import { MakeRegisterUserUseCase } from '@/use-case/factories/make-register-user-use-case.factory'

// error-handling
import {  UserAlreadyExistsError } from '@/use-case/errors/user-already-exists.error';

export async function RegisterUserController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const registerUserUseCase = MakeRegisterUserUseCase();

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