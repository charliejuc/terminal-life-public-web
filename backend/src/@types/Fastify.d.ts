import 'fastify'

declare module 'fastify' {
    interface FastifyRequest {
        json?: Record<string, unknown>
    }
}
