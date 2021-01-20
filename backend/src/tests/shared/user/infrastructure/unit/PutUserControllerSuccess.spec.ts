import { setupFastifyServer } from '@/FastifyServer'
import { UserCreatedAt } from '@/modules/shared/user/domain/value-objects/UserCreatedAt'
import { UserUpdatedAt } from '@/modules/shared/user/domain/value-objects/UserUpdatedAt'
import {
    userRoutes,
    userServerRoutesFactory
} from '@/modules/shared/user/infrastructure/UserRoutes'
import { resolveBody } from '@/tests/shared/infrastructure/Controller'
import { userMother } from '@/tests/shared/user/domain/mothers/UserMother'
import { userPrimitivesMother } from '@/tests/shared/user/domain/mothers/UserPrimitivesMother'
import { FastifyInstance } from 'fastify'
import LightMyRequest from 'light-my-request'

let createUserSpy: jest.Mock
let app: FastifyInstance
beforeEach(async () => {
    createUserSpy = jest.fn(userMother)
    app = setupFastifyServer()

    await app.register(userServerRoutesFactory(createUserSpy), {
        prefix: userRoutes.prefixV1
    })
})

async function injectPutUserRequest(body: unknown): Promise<LightMyRequest.Response> {
    return app.inject({
        method: 'PUT',
        url: `${userRoutes.prefixV1}${userRoutes.create}`,
        payload: resolveBody(body),
        headers: {
            'content-type': 'application/json'
        }
    })
}

it('"statusCode" should be "204"', async () => {
    const response = await injectPutUserRequest(userPrimitivesMother())
    expect(response.statusCode).toBe(204)
})

it('"createUserSpy" should be called', async () => {
    await injectPutUserRequest(userPrimitivesMother())
    expect(createUserSpy).toBeCalledTimes(1)
})

it('"createUserSpy" should be called with passed body', async () => {
    const body = userPrimitivesMother()

    await injectPutUserRequest(body)

    const createdAt = createUserSpy.mock.calls[0][0].createdAt
    const updatedAt = createUserSpy.mock.calls[0][0].updatedAt

    expect(createUserSpy).toBeCalledWith({
        ...userMother(body).toValueObjects(),
        createdAt,
        updatedAt
    })

    expect(createdAt).toBeInstanceOf(UserCreatedAt)
    expect(updatedAt).toBeInstanceOf(UserUpdatedAt)
})

it('"createUserSpy" UserCreatedAt should be a Date greater than now', async () => {
    const body = userPrimitivesMother()

    await injectPutUserRequest(body)

    const createdAt = createUserSpy.mock.calls[0][0].createdAt

    expect(createdAt.value.getTime()).toBeLessThanOrEqual(Date.now())
})

it('"createUserSpy" UserUpdatedAt should be a Date greater than now', async () => {
    const body = userPrimitivesMother()

    await injectPutUserRequest(body)

    const updatedAt = createUserSpy.mock.calls[0][0].updatedAt

    expect(updatedAt.value.getTime()).toBeLessThanOrEqual(Date.now())
})

it('"createUserSpy" should be called with passed body', async () => {
    const user = userMother()
    const body = user.toPrimitives()

    await injectPutUserRequest(body)

    const createdAt = createUserSpy.mock.calls[0][0].createdAt
    const updatedAt = createUserSpy.mock.calls[0][0].updatedAt

    expect(createdAt).not.toStrictEqual(user.createdAt)
    expect(updatedAt).not.toStrictEqual(user.updatedAt)
})
