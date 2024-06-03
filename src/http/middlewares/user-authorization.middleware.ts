// dependencies 
import { env } from '@/env';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export const userAuthorizationMiddleware = (request: FastifyRequest, reply: FastifyReply, done: any) => {

    const hasAuthorizationToken = request.headers["authorization"];

    if(!hasAuthorizationToken) {
        return reply.status(403).send({ message: 'Access denied' });
    }
    
    const authorizationToken = hasAuthorizationToken.replace("Bearer ", "");

    const isTokenVerified = jwt.verify(authorizationToken, env.JWT_SECRET);
    
    if(!isTokenVerified) {
        return reply.status(403).send({ message: 'Access denied' });
    }

    done();

}