import { Db, MongoClient, MongoClientCommonOption } from 'mongodb'
import objectOmit from 'object.omit'
import { mongoDatabaseConfig, MongoDatabaseConfig } from './Config'

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

    await mongoClient.connect()
}

export async function closeMongoConnection(): Promise<void> {
    if (mongoClient === null) {
        throw new Error('"mongoClient" is null, run "setupMongoConnection" before this')
    }

    await mongoClient.close()

    mongoClient = null
}

export function getMongoDatabase(databaseName: string, options?: MongoClientCommonOption): Db {
    if (mongoClient === null) {
        throw new Error('"mongoClient" is null, run "setupMongoConnection" before this')
    }

    return mongoClient.db(databaseName, options)
}
