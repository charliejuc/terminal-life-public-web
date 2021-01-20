import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import {
    userRoutes,
    userServerRoutesFactory
} from '@/modules/shared/user/infrastructure/UserRoutes'

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

    await setupRoutes(server)

    return server
}
