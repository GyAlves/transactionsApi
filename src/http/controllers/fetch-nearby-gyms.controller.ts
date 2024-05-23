// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// use case
import { MakeFetchNearbyGymsUseCase } from '@/use-case/factories/make-fetch-nearby-gyms-use-case.factory';

export async function FetchNearbyGymsController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const fetchNearbyGymsUserUseCase = MakeFetchNearbyGymsUseCase();

        const fetchNearbyGymsBodySchema = z.object({
            userLatitude: z.string(),
            userLongitude: z.string(),
        });

        const { userLatitude, userLongitude } = fetchNearbyGymsBodySchema.parse(request.query);

        const { gyms } = await fetchNearbyGymsUserUseCase.execute({ userLatitude, userLongitude });

        reply.status(201).send({ message: 'Nearby gyms found successfully', gyms });

    } catch (error) {
        reply.status(400).send(error)
    }

}