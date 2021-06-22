import { Db, MongoClient } from 'mongodb'
import objectOmit from 'object.omit'
import { mongoDatabaseConfig, MongoDatabaseConfig } from './Config'

export interface GetMongoOptions {
    database: string
}

let mongoClient: MongoClient | null = null
const urlTemplate = (options: MongoDatabaseConfig): string =>
    `mongodb://${options.user}:${options.password}@${options.host}:${options.port.toString()}/${
        options.database
    }`
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

export function getMongoDatabase(options: GetMongoOptions): Db {
    const databaseName = options.database

    if (mongoClient === null) {
        throw new Error('"mongoClient" is null, run "setupMongoConnection" before this')
    }

    return mongoClient.db(databaseName)
}

// setupMongoConnection(mongoDatabaseConfig).catch(console.error)
console.log(urlTemplate(mongoDatabaseConfig))
