// dependencies
import { FastifyInstance } from 'fastify'

// controllers
import { RegisterUserController } from './controllers/register-user.controller'
import { AuthenticateUserController } from './controllers/authenticate-user.constroller'

export async function Router(app: FastifyInstance) {
    app.post('/user', RegisterUserController)
    app.post('/sessions', AuthenticateUserController)
}