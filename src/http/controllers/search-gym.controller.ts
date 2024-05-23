// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// factories
import { MakeSearchGymUseCase } from '@/use-case/factories/make-search-gym-use-case.factory'
import { getSystemErrorName } from 'util';

// error-handling

export async function SearchGymController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const validateCheckInUseCase = MakeSearchGymUseCase();

        const SearchGymBodySchema = z.object({
            title: z.string(),
            page: z.string(),
        });

        const { title, page } = SearchGymBodySchema.parse(request.query);

        const { gyms } = await validateCheckInUseCase.execute({ query: title, page });

        reply.status(201).send({ message: 'Gym found successfully', gyms })

    } catch (error) {

        reply.status(400).send(error)
    }

}