import { putUserControllerFactory } from '@/modules/shared/user/infrastructure/controllers/PutUserController'
import { FastifyReply, FastifyRequest } from 'fastify'

let putUserController: ReturnType<typeof putUserControllerFactory>
const replyStatusSpy = jest.fn()
const createUserSpy = jest.fn()
beforeEach(() => {
    putUserController = putUserControllerFactory(createUserSpy)
})

async function callPutUserController(body: unknown): ReturnType<typeof putUserController> {
    return putUserController(
        {
            body: JSON.stringify(body)
        } as FastifyRequest,
        ({
            status: replyStatusSpy
        } as unknown) as FastifyReply
    )
}

it('"replyStatusSpy" should be called', async () => {
    await callPutUserController({})
    expect(replyStatusSpy).toBeCalledTimes(1)
})

it('"replyStatusSpy" should be called with status code "204"', async () => {
    await callPutUserController({})
    expect(replyStatusSpy).toBeCalledWith(204)
})

it('"createUserSpy" should be called', async () => {
    await callPutUserController({})
    expect(createUserSpy).toBeCalledTimes(1)
})

it('"createUserSpy" should be called with passed body', async () => {
    const body = { a: 1 }
    await callPutUserController(body)
    expect(createUserSpy).toBeCalledWith(body)
})
