import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import {
    userRoutes,
    userServerRoutesFactory
} from '@/modules/shared/user/infrastructure/UserRoutes'
import { setupMongoConnection } from './modules/shared/lib/mongo/Connection'
import { mongoDatabaseConfig } from './modules/shared/lib/mongo/Config'

export function setupFastifyServer(options?: FastifyServerOptions): FastifyInstance {
    options = options ?? {}
    return fastify({
        ...options
    })
}

const setupRoutes = async (server: FastifyInstance): Promise<void> => {
    await server.register(
        userServerRoutesFactory(async () => null),
        {
            prefix: userRoutes.prefixV1
        }
    )
}

export const buildServer = async (options?: FastifyServerOptions): Promise<FastifyInstance> => {
    const server = setupFastifyServer(options)

    await setupMongoConnection(mongoDatabaseConfig)

    await setupRoutes(server)

    return server
}
