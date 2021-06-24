import R from 'ramda'
import { mongoDatabaseConfig } from '../../lib/mongo/Config'
import { getMongoDatabase } from '../../lib/mongo/Connection'
import { CreateUser } from '../domain/Repositories'
import { User, UserEntityOptions } from '../domain/User'

const errorLog: typeof console.error = R.partial(console.error, ['[User Repository Error]'])
const db = getMongoDatabase(mongoDatabaseConfig.database)
const collection = db.collection('users')

export const createUserRepository: CreateUser = async (
    userOptions: UserEntityOptions
): Promise<User | null> => {
    const user = new User(userOptions)

    try {
        await collection.updateOne(
            {
                username: user.username
            },
            {
                $set: user
            },
            {
                upsert: true
            }
        )
    } catch (err) {
        errorLog('[CREATE]', err)
        return null
    }

    return user
}
