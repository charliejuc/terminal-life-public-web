import { Db, MongoClient, MongoClientCommonOption } from 'mongodb'
import objectOmit from 'object.omit'
import { handleFatalError } from '../../utils/Error'
import { mongoDatabaseConfig, MongoDatabaseConfig } from './Config'

class MongoClientNullError extends Error {
    message = '"mongoClient" is null, run "setupMongoConnection" before this'
}

const urlTemplate = (options: MongoDatabaseConfig): string =>
    `mongodb://${options.user}:${options.password}@${options.host}:${options.port.toString()}/${
        options.database
    }`
let mongoClient: MongoClient | null = null
export async function setupMongoConnection(
    mongoDatabaseConfig: MongoDatabaseConfig
): Promise<void> {
    if (mongoClient !== null) {
        return
    }

    const url = urlTemplate(mongoDatabaseConfig)

    mongoClient = new MongoClient(
        url,
        objectOmit(mongoDatabaseConfig, ['database', 'user', 'password', 'host', 'port'])
    )

    try {
        await mongoClient.connect()
    } catch (err) {
        mongoClient = null
        throw err
    }
}

export async function closeMongoConnection(): Promise<void> {
    if (mongoClient === null) {
        throw new MongoClientNullError()
    }

    await mongoClient.close()

    mongoClient = null
}

export function getMongoDatabase(
    databaseName: string,
    options?: MongoClientCommonOption,
    _mongoDatabaseConfig?: MongoDatabaseConfig,
    _log?: (...args: unknown[]) => void,
    _isRetry?: boolean
): Db {
    if (mongoClient === null) {
        if (_isRetry) {
            throw new MongoClientNullError()
        }

        const logger = _log ?? handleFatalError
        setupMongoConnection(_mongoDatabaseConfig ?? mongoDatabaseConfig).catch(logger)

        const updatedIsRetry = true
        return getMongoDatabase(databaseName, options, _mongoDatabaseConfig, _log, updatedIsRetry)
    }

    return mongoClient.db(databaseName, options)
}
