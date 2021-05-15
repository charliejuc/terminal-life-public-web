import R from 'ramda'
import { mongoDatabaseConfig } from '../../lib/mongo/Config'
import { getMongoDatabase } from '../../lib/mongo/Connection'
import { CreateUser, GetUserById } from '../domain/Repositories'
import { User, UserEntityOptions } from '../domain/User'
import { UserId } from '../domain/value-objects/UserId'

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
                $set: {
                    _id: user.id,
                    ...user.toPrimitives()
                }
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

export const getUserById: GetUserById = async (id: UserId): Promise<User | null> => {
    try {
        const result = await collection.findOne({
            _id: id.value
        })

        return User.fromPrimitives({
            id: result._id,
            ...result
        })
    } catch (err) {
        errorLog('[GET]', err)
        return null
    }
}
