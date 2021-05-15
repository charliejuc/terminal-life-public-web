import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { setupRoutes } from './Routes'
import { setupFastifyServer } from './SetupFastifyServer'

export const buildServer = async (options?: FastifyServerOptions): Promise<FastifyInstance> => {
    const server = setupFastifyServer(options)

    await setupRoutes(server)

    return server
}
