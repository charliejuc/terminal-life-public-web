import fastify, {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    FastifyServerOptions
} from 'fastify'

function setupFastifyServer(options?: FastifyServerOptions): FastifyInstance {
    options = options ?? {}
    return fastify({
        ...options
    })
}

async function setupRoutes(server: FastifyInstance): Promise<void> {
    server.get(
        '/',
        async function (request: FastifyRequest, reply: FastifyReply): Promise<unknown> {
            return { hello: 'world' }
        }
    )
}

export async function buildServer(options?: FastifyServerOptions): Promise<FastifyInstance> {
    const server = setupFastifyServer(options)

    await setupRoutes(server)

    return server
}
