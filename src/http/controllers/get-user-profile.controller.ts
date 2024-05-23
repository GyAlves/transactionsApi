// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// use case
import { MakeGetUserProfileUseCase } from '@/use-case/factories/make-get-user-profile-use-case.factory';

// error-handling
import { ResourceNotFoundError } from '@/use-case/errors/resource-not-found.error';

export async function GetUserProfileController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const getUserProfileUseCase = MakeGetUserProfileUseCase();

        const authenticateUserBodySchema = z.object({
            userId: z.string().uuid(),
        });

        const { userId } = authenticateUserBodySchema.parse(request.params);

        const { user } = await getUserProfileUseCase.execute({ userId });

        reply.status(201).send({ message: 'User found successfully', user });

    } catch (error) {
        
        if(error instanceof ResourceNotFoundError) {
            reply.status(404).send({ error: error.message })
        }

        reply.status(400).send(error)
    }

}