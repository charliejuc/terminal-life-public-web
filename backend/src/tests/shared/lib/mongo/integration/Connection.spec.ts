import { mongoDatabaseConfig } from '@/modules/shared/lib/mongo/Config'
import {
    closeMongoConnection,
    getMongoDatabase,
    setupMongoConnection
} from '@/modules/shared/lib/mongo/Connection'
import { randomString } from '@/modules/shared/utils/Random'
import { sleep } from '@/modules/shared/utils/Time'
import { Db } from 'mongodb'

afterEach(async () => {
    try {
        await closeMongoConnection()
    } catch (err) {}
})

describe('Success', () => {
    it('"setupMongoConnection" should not throw an exception', async () => {
        let error: unknown = null
        try {
            await setupMongoConnection(mongoDatabaseConfig)
        } catch (err) {
            error = err
        }

        expect(error).toBeNull()
    })

    it('"getMongoDatabase" should not throw an exception', async () => {
        await setupMongoConnection(mongoDatabaseConfig)

        expect(() => getMongoDatabase(mongoDatabaseConfig.database)).not.toThrow()
    })

    it('"getMongoDatabase" should not throw an exception', async () => {
        await setupMongoConnection(mongoDatabaseConfig)

        expect(getMongoDatabase(mongoDatabaseConfig.database)).toBeInstanceOf(Db)
    })
})

describe('Fail', () => {
    it('"setupMongoConnection" should throw an exception', async () => {
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

    it('"getMongoDatabase" should throw an exception when "setupMongoConnections" was called with invalid config', async () => {
        const _getMongoDatabase = (isRetry?: boolean): ReturnType<typeof getMongoDatabase> =>
            getMongoDatabase(
                mongoDatabaseConfig.database,
                {},
                {
                    ...mongoDatabaseConfig,
                    password: randomString(1, 64)
                },
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                () => {},
                isRetry
            )

        _getMongoDatabase()

        await sleep(100)

        const isRetry = true
        expect(() => _getMongoDatabase(isRetry)).toThrow()
    })
})
