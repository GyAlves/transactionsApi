// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// use case
import { MakeGetUserMetricsUseCase } from '@/use-case/factories/make-get-user-metrics.factory';

// error-handling

export async function FetchUserMetricsController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const getUserProfileUseCase = MakeGetUserMetricsUseCase();

        const fetchUserMetricsBodySchema = z.object({
            userId: z.string().uuid(),
        });

        const { userId } = fetchUserMetricsBodySchema.parse(request.params);

        const { checkInsCount } = await getUserProfileUseCase.execute({ userId });

        reply.status(201).send({ message: 'User metrics found successfully', metrics: checkInsCount });

    } catch (error) {

        reply.status(400).send(error)
    }

}