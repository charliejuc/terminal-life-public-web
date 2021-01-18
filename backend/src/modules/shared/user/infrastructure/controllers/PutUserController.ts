import { FastifyReply, FastifyRequest } from 'fastify'
import { requestBodyParser } from '@/modules/shared/user/infrastructure/fastify/RequestBodyParser'
import {
    CreateUser,
    createUserUseCaseFactory
} from '@/modules/shared/user/application/CreateUserUseCase'

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
    const createUserUseCase = createUserUseCaseFactory(createUser)
    await createUserUseCase(request.json ?? {})
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
