import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { setupMongoConnection } from './modules/shared/lib/mongo/Connection'
import { mongoDatabaseConfig } from './modules/shared/lib/mongo/Config'
import { setupRoutes } from './Routes'
import { setupFastifyServer } from './SetupFastifyServer'

export const buildServer = async (options?: FastifyServerOptions): Promise<FastifyInstance> => {
    const server = setupFastifyServer(options)

    await setupMongoConnection(mongoDatabaseConfig)

    await setupRoutes(server)

    return server
}
