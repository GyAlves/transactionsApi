// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// factories
import { MakeRegisterGymUseCase } from '@/use-case/factories/make-register-gym-use-case.factory'

// error-handling

export async function RegisterGymController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const validateCheckInUseCase = MakeRegisterGymUseCase();

        const registerUserBodySchema = z.object({
            title: z.string(), 
            description: z.string().optional(), 
            phone: z.string().optional(), 
            latitude: z.number(), 
            longitude: z.number(),
        });

        const { title, description, phone, latitude, longitude  } = registerUserBodySchema.parse(request.body);

        const { gym } = await validateCheckInUseCase.execute({  title, description, phone, latitude, longitude  });

        reply.status(201).send({ message: 'Gym created successfully', gym })

    } catch (error) {
        reply.status(400).send(error)
    }

}