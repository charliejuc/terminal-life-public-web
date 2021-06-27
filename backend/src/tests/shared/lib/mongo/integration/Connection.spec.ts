import { mongoDatabaseConfig } from '@/modules/shared/lib/mongo/Config'
import {
    closeMongoConnection,
    getMongoDatabase,
    setupMongoConnection
} from '@/modules/shared/lib/mongo/Connection'
import { Db } from 'mongodb'

afterAll(async () => {
    await closeMongoConnection()
})

it('should run "setupMongoConnection" should not throw an exception', async () => {
    let error: unknown = null
    try {
        await setupMongoConnection(mongoDatabaseConfig)
    } catch (err) {
        error = err
    }

    expect(error).toBeNull()
})

it('should run "getMongoDatabase" should not throw an exception', async () => {
    await setupMongoConnection(mongoDatabaseConfig)

    expect(() => getMongoDatabase(mongoDatabaseConfig.database)).not.toThrow()
})

it('should run "getMongoDatabase" should not throw an exception', async () => {
    await setupMongoConnection(mongoDatabaseConfig)

    expect(getMongoDatabase(mongoDatabaseConfig.database)).toBeInstanceOf(Db)
})
