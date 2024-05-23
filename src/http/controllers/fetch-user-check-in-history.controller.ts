// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// use case
import { MakeFetchUserCheckInHistoryUseCase } from '@/use-case/factories/make-fetch-user-check-in-history.use-case.factory';

// error-handling

export async function FetchUserCheckInHistoryController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const fetchUserCheckInUseCase = MakeFetchUserCheckInHistoryUseCase();

        const fetchUserCheckInHistoryUserIdBodySchema = z.object({
            userId: z.string().uuid(),
        });

        const fetchUserCheckInHistoryPaginationBodySchema = z.object({
            page: z.string(),
        });


        const { userId } = fetchUserCheckInHistoryUserIdBodySchema.parse(request.params);
        const { page } = fetchUserCheckInHistoryPaginationBodySchema.parse(request.query);


        const { checkIns } = await fetchUserCheckInUseCase.execute({ userId, page });

        reply.status(201).send({ message: 'User check-in history found successfully', history: checkIns });

    } catch (error) {

        reply.status(400).send(error)
    }

}