// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// error-handling
import { InvalidUserCredentialsError } from '@/use-case/errors/invalid-user-credentials.error';
import { MakeAuthenticateUserUseCase } from '@/use-case/factories/make-authenticate-user-use-case.factory';

export async function AuthenticateUserController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const authenticateUserUseCase = MakeAuthenticateUserUseCase();

        const authenticateUserBodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        });

        const { email, password } = authenticateUserBodySchema.parse(request.body);

        const { user } = await authenticateUserUseCase.execute({ email, password });

        reply.status(201).send({ message: 'User authenticated successfully', user});

    } catch (error) {
        
        if(error instanceof InvalidUserCredentialsError) {
            reply.status(403).send({ error: error.message })
        }

        reply.status(400).send(error)
    }

}