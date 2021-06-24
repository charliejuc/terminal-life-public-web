import { mongoDatabaseConfig } from '../../lib/mongo/Config'
import { getMongoDatabase } from '../../lib/mongo/Connection'
import { CreateUser } from '../domain/Repositories'
import { User, UserEntityOptions } from '../domain/User'

export const createUserRepository: CreateUser = async (
    userOptions: UserEntityOptions
): Promise<User | null> => {
    const db = getMongoDatabase(mongoDatabaseConfig.database)

    return null
}
