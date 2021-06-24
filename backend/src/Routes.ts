import { FastifyInstance } from 'fastify'
import {
    userRoutes,
    userServerRoutesFactory
} from '@/modules/shared/user/infrastructure/UserRoutes'
import { createUserRepository } from './modules/shared/user/infrastructure/Repositories'

export const setupRoutes = async (server: FastifyInstance): Promise<void> => {
    await server.register(userServerRoutesFactory(createUserRepository), {
        prefix: userRoutes.prefixV1
    })
}
