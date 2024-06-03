
// dependencies
import fastify from 'fastify'
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';

// routes 
import { Router } from './http/routes';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
});
app.register(Router);
app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation Error.', issues: error.format() })
    }

    if(env.ENVIRONMENT !== 'production') {
        console.error(error)
    }else {
        // TODO: Add some external tool. Ex: datadog, sentry
    }

    return reply.status(500).send({ message: 'Internal Server Error'})
})