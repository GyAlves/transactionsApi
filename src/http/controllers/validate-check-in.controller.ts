// dependencies
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// factories
import { MakeRegisterCheckInUseCase } from '@/use-case/factories/make-validate-check-in-use-case.factory'

// error-handling
import { ResourceNotFoundError } from '@/use-case/errors/resource-not-found.error';
import { LateCheckInValidationError } from '@/use-case/errors/late-check-in-validation.error';

export async function ValidateCheckInController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const validateCheckInUseCase = MakeRegisterCheckInUseCase();

        const registerUserBodySchema = z.object({
            checkInId: z.string().uuid(),
        });

        const { checkInId } = registerUserBodySchema.parse(request.params);

        await validateCheckInUseCase.execute({ checkInId: checkInId });

        reply.status(201).send({message: 'CheckIn validated successfully'})

    } catch (error) {
        
        if(error instanceof ResourceNotFoundError) {
            reply.status(404).send({ error: error.message })
        }

        if(error instanceof LateCheckInValidationError) {
            reply.status(403).send({ error: error.message })
        }

        reply.status(400).send(error)
    }

}