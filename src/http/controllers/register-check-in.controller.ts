// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// use cases
import { MakeRegisterCheckInUseCase } from '@/use-case/factories/make-register-check-in-use-case.factory'
// error-handling
import { ResourceNotFoundError } from '@/use-case/errors/resource-not-found.error';
import { GymIsOutOfCheckInRangeError } from '@/use-case/errors/gym-is-out-of-check-in-range.error';
import { MultiplesCheckInsOnSameDayError } from '@/use-case/errors/multiples-check-ins-on-same-day.error';

export async function RegisterCheckInController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const registerCheckInUseCase = MakeRegisterCheckInUseCase();

        const authenticateUserBodySchema = z.object({
            userId: z.string(),
            gymId: z.string(),
            userLatitude: z.number(),
            userLongitude: z.number(),
        });

        const { userId, gymId, userLatitude, userLongitude } = authenticateUserBodySchema.parse(request.body);

        const { checkIn } = await registerCheckInUseCase.execute({ userId, gymId, userLatitude, userLongitude  });

        reply.status(201).send({ message: 'CheckIn registered successfully', checkIn});

    } catch (error) {
        
        if(error instanceof ResourceNotFoundError) {
            reply.status(404).send({ error: error.message })
        }

        if(error instanceof GymIsOutOfCheckInRangeError) {
            reply.status(403).send({ error: error.message })
        }

        if(error instanceof MultiplesCheckInsOnSameDayError) {
            reply.status(400).send({ error: error.message })
        }

        reply.status(400).send(error)
    }

}