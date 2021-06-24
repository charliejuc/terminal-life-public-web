import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'

export function setupFastifyServer(options?: FastifyServerOptions): FastifyInstance {
    options = options ?? {}
    return fastify({
        ...options
    })
}
