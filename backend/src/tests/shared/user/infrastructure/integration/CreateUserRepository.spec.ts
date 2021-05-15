import { closeMongoConnection } from '@/modules/shared/lib/mongo/Connection'
import { createUserRepository } from '@/modules/shared/user/infrastructure/Repositories'
import { userMother } from '../../domain/mothers/UserMother'

afterAll(async () => {
    try {
        await closeMongoConnection()
    } catch (err) {
        console.error(err)
    }
})

it('"createUserRepository" should not throw an exception', async () => {
    let error: unknown = null
    try {
        await createUserRepository(userMother().toValueObjects())
    } catch (err) {
        error = err
    }

    expect(error).toBeNull()
})
