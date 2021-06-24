import { Db, MongoClient, MongoClientCommonOption } from 'mongodb'
import objectOmit from 'object.omit'
import { MongoDatabaseConfig } from './Config'

const urlTemplate = (options: MongoDatabaseConfig): string =>
    `mongodb://${options.user}:${options.password}@${options.host}:${options.port.toString()}/${
        options.database
    }`
let mongoClient: MongoClient | null = null
export async function setupMongoConnection(
    mongoDatabaseConfig: MongoDatabaseConfig
): Promise<MongoClient> {
    if (mongoClient === null) {
        const url = urlTemplate(mongoDatabaseConfig)

        mongoClient = new MongoClient(
            url,
            objectOmit(mongoDatabaseConfig, ['database', 'user', 'password', 'host', 'port'])
        )

        await mongoClient.connect()
    }

    return mongoClient
}

export function getMongoDatabase(databaseName: string, options?: MongoClientCommonOption): Db {
    if (mongoClient === null) {
        throw new Error('"mongoClient" is null, run "setupMongoConnection" before this')
    }

    return mongoClient.db(databaseName, options)
}
