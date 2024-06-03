// dependencies
import { FastifyInstance } from 'fastify'

// controllers
import { RegisterUserController } from './controllers/register-user.controller'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { ValidateCheckInController } from './controllers/validate-check-in.controller'
import { SearchGymController } from './controllers/search-gym.controller'
import { RegisterGymController } from './controllers/register-gym.controller'
import { RegisterCheckInController } from './controllers/register-check-in.controller';
import { GetUserProfileController } from './controllers/get-user-profile.controller';
import { FetchUserMetricsController } from './controllers/fetch-user-metrics.controller'
import { FetchUserCheckInHistoryController } from './controllers/fetch-user-check-in-history.controller'
import { FetchNearbyGymsController } from './controllers/fetch-nearby-gyms.controller'

// middlewares
import { userAuthorizationMiddleware } from './middlewares/user-authorization.middleware'

export async function Router(app: FastifyInstance) {
    app.post('/user', RegisterUserController)
    app.post('/sessions', AuthenticateUserController)
    app.get("/gym", SearchGymController)
    app.post("/gym", RegisterGymController)
    app.get('/nearby-gyms', FetchNearbyGymsController )

    // Authenticated routes
    app.get('/user/:userId', { onRequest: [ userAuthorizationMiddleware ]}, GetUserProfileController)
    app.get('/user/:userId/metrics',{ onRequest: [ userAuthorizationMiddleware ]}, FetchUserMetricsController)
    app.get('/user/:userId/history', { onRequest: [ userAuthorizationMiddleware ]}, FetchUserCheckInHistoryController)
    app.post("/check-in", { onRequest: [ userAuthorizationMiddleware ]}, RegisterCheckInController)
    app.patch("/check-in/:checkInId/validate", { onRequest: [ userAuthorizationMiddleware ]}, ValidateCheckInController)
}