import { MongoClientOptions } from 'mongodb'
import * as MongoEnvironmentGuard from './EnvironmentGuard'

export interface MongoDatabaseConfig extends MongoClientOptions {
    database: string
    user: string
    password: string
    host: string
    port: number
    useUnifiedTopology: boolean
}

export const mongoDatabaseConfig: MongoDatabaseConfig = {
    database: MongoEnvironmentGuard.MONGO_DATABASE(process.env.MONGO_DATABASE ?? 'test_db'),
    user: MongoEnvironmentGuard.MONGO_USERNAME(process.env.MONGO_DATABASE ?? 'mongo'),
    password: MongoEnvironmentGuard.MONGO_PASSWORD(process.env.MONGO_PASSWORD ?? 'mongo'),
    host: MongoEnvironmentGuard.MONGO_HOST(process.env.MONGO_HOST ?? 'localhost'),
    port: MongoEnvironmentGuard.MONGO_PORT(process.env.MONGO_PORT ?? 27017),
    useUnifiedTopology: true
}
