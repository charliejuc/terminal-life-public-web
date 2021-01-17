import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import { userServerRoutes } from '@/modules/shared/user/infrastructure/UserRoutes'

function setupFastifyServer(options?: FastifyServerOptions): FastifyInstance {
    options = options ?? {}
    return fastify({
        ...options
    })
}

async function setupRoutes(server: FastifyInstance): Promise<void> {
    await server.register(userServerRoutes, {
        prefix: '/user'
    })
}

export async function buildServer(options?: FastifyServerOptions): Promise<FastifyInstance> {
    const server = setupFastifyServer(options)

    await setupRoutes(server)

    return server
}
