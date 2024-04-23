// dependencies
import { FastifyInstance } from 'fastify'

// controllers
import { RegisterUserController } from './controllers/register-user.controller'

export async function Router(app: FastifyInstance) {
    app.post('/user', RegisterUserController)
}