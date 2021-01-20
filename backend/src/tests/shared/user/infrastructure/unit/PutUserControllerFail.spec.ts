import { setupFastifyServer } from '@/FastifyServer'
import {
    userRoutes,
    userServerRoutesFactory
} from '@/modules/shared/user/infrastructure/UserRoutes'
import { resolveBody } from '@/tests/shared/infrastructure/Controller'
import {
    invalidUserActiveMotherMessage,
    invalidUserIdMotherMessage,
    invalidUserPasswordMotherMessage,
    invalidUserUsernameMotherMessage
} from '@/tests/shared/user/domain/mothers/UserErrorMother'
import {
    userInvalidNumberPasswordPrimitiveMother,
    userPasswordPrimitiveMother,
    userPrimitivesMother
} from '@/tests/shared/user/domain/mothers/UserPrimitivesMother'
import { FastifyInstance } from 'fastify'
import LightMyRequest from 'light-my-request'

const createUserSpy = jest.fn()
let app: FastifyInstance
beforeEach(async () => {
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

it('"statusCode" should be "400"', async () => {
    const response = await injectPutUserRequest({
        ...userPrimitivesMother({
            id: ''
        }),
        id: 'dfsadf'
    })
    expect(response.statusCode).toBe(400)
})

it('"createUserSpy" should not be called', async () => {
    await injectPutUserRequest({
        ...userPrimitivesMother({
            id: ''
        }),
        id: {}
    })
    expect(createUserSpy).not.toBeCalled()
})

it('"createUserSpy" should contain errors', async () => {
    const response = await injectPutUserRequest({
        ...userPrimitivesMother({
            id: ''
        }),
        id: []
    })

    expect(await response.json()).toHaveProperty('errors')
})

it('should contain id errors', async () => {
    const response = await injectPutUserRequest({
        ...userPrimitivesMother({
            id: ''
        }),
        id: []
    })

    expect(await response.json()).toHaveProperty(['errors', 'id'])
})

it('should contain InvalidUserId', async () => {
    const response = await injectPutUserRequest({
        ...userPrimitivesMother({
            id: ''
        }),
        id: []
    })

    expect(await response.json()).toStrictEqual({
        errors: {
            id: invalidUserIdMotherMessage()
        }
    })
})

it('should contain InvalidUserUsername', async () => {
    const response = await injectPutUserRequest({
        ...userPrimitivesMother({
            username: ''
        }),
        username: []
    })

    expect(await response.json()).toStrictEqual({
        errors: {
            username: invalidUserUsernameMotherMessage()
        }
    })
})

it('should contain InvalidUserActive', async () => {
    const response = await injectPutUserRequest({
        ...userPrimitivesMother({
            active: false
        }),
        active: 0
    })

    expect(await response.json()).toStrictEqual({
        errors: {
            active: invalidUserActiveMotherMessage()
        }
    })
})
it('should contain InvalidUserPassword - short password', async () => {
    const response = await injectPutUserRequest({
        ...userPrimitivesMother({
            password: userPasswordPrimitiveMother().slice(0, 9)
        })
    })

    expect(await response.json()).toStrictEqual({
        errors: {
            password: invalidUserPasswordMotherMessage()
        }
    })
})

it('should contain InvalidUserPassword - numeric password', async () => {
    const response = await injectPutUserRequest({
        ...userPrimitivesMother({
            password: userInvalidNumberPasswordPrimitiveMother()
        })
    })

    expect(await response.json()).toStrictEqual({
        errors: {
            password: invalidUserPasswordMotherMessage()
        }
    })
})
