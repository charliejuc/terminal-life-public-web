import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function userServerRoutes(server: FastifyInstance): Promise<void> {
    server.get(
        '/',
        async function (request: FastifyRequest, reply: FastifyReply): Promise<unknown> {
            return { hello: 'world' }
        }
    )
}
