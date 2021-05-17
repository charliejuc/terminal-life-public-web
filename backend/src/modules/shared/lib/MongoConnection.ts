// import { MongoClient, Db } from 'mongodb'
// import { MongoDatabaseConfig } from '@/module/shared/infrastructure/database/config/MongoDatabaseConfig'
// import objectOmit from 'object.omit'
// import { mongoDatabaseEnvironmentValidation } from '@/module/shared/infrastructure/database/config/environment-validation/MongoDatabaseEnvironmentValidation'
// import { Environments } from '../types/Config'

// export interface GetMongoOptions {
//     database: string
// }

// let mongoClient: MongoClient | null = null
// const urlTemplate = (options: MongoDatabaseConfig): string =>
//     `mongodb://${options.user}:${options.password}@${options.host}:${options.port.toString()}/${
//         options.database
//     }`
// export async function setupMongoConnection(
//     mongoDatabaseConfig: MongoDatabaseConfig,
//     options?: {
//         environmentValidationConfig?: {
//             environment: Environments
//         }
//     }
// ): Promise<MongoClient> {
//     if (mongoClient === null) {
//         mongoDatabaseEnvironmentValidation(options?.environmentValidationConfig?.environment)
//         const url = urlTemplate(mongoDatabaseConfig)

//         mongoClient = new MongoClient(
//             url,
//             objectOmit(mongoDatabaseConfig, ['database', 'user', 'password', 'host', 'port'])
//         )

//         await mongoClient.connect()
//     }

//     return mongoClient
// }

// export function getMongoDatabase(options: GetMongoOptions): Db {
//     const databaseName = options.database

//     if (mongoClient === null) {
//         throw new Error('"mongoClient" is null, run "setupMongoConnection" before this')
//     }

//     return mongoClient.db(databaseName)
// }
