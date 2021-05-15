import { FastifyInstance } from 'fastify'
import { putUserControllerFactory } from '@/modules/shared/user/infrastructure/controllers/PutUserController'
import { CreateUser } from '@/modules/shared/user/domain/Repositories'

export enum userRoutes {
    prefixV1 = '/v1/user',
    create = '/register'
}

export const userServerRoutesFactory =
    (createUser: CreateUser) =>
    async (server: FastifyInstance): Promise<void> => {
        server.put(userRoutes.create, putUserControllerFactory(createUser))
    }
