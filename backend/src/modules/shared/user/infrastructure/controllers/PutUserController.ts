import { FastifyReply, FastifyRequest } from 'fastify'
import { requestBodyParser } from '@/modules/shared/user/infrastructure/fastify/RequestBodyParser'

export type User = Record<string, unknown>
export type CreateUser = (userOptions: User) => Promise<User | null>

export async function putUserController(
    createUser: CreateUser,
    {
        request,
        reply
    }: {
        request: FastifyRequest
        reply: FastifyReply
    }
): Promise<void> {
    await createUser(request.json ?? {})
    reply.status(204)
}

export function putUserControllerFactory(
    createUser: CreateUser
): (request: FastifyRequest, reply: FastifyReply) => ReturnType<typeof putUserController> {
    return async (
        request: FastifyRequest,
        reply: FastifyReply
    ): ReturnType<typeof putUserController> => {
        request.json = requestBodyParser(request.body)

        return putUserController(createUser, {
            request,
            reply
        })
    }
}
