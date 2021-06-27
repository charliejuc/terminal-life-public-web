import { mongoDatabaseConfig } from '@/modules/shared/lib/mongo/Config'
import {
    closeMongoConnection,
    getMongoDatabase,
    setupMongoConnection
} from '@/modules/shared/lib/mongo/Connection'
import { randomString } from '@/modules/shared/utils/Random'
import { Db } from 'mongodb'

afterEach(async () => {
    try {
        await closeMongoConnection()
    } catch (err) {}
})

describe('Success', () => {
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
})

describe('Fail', () => {
    it('should run "setupMongoConnection" should throw an exception', async () => {
        const _mongoDatabaseConfig = {
            ...mongoDatabaseConfig,
            password: randomString(1, 64)
        }

        let error: unknown = null
        try {
            await setupMongoConnection(_mongoDatabaseConfig)
        } catch (err) {
            error = err
        }

        expect(error).not.toBeNull()
    })

    it('should run "getMongoDatabase" should throw an exception when "setupMongoConnections" was not called', async () => {
        expect(() => getMongoDatabase(mongoDatabaseConfig.database)).toThrow()
    })
})
