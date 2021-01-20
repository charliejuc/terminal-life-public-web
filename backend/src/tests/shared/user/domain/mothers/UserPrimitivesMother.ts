import { randomNumber } from '@/modules/shared/utils/Random'
import faker from 'faker'
import { v4 } from 'uuid'

export const primitiveMotherFactory = (valueType: unknown) => <T>(
    fn: () => T
): ((value?: unknown) => T) => (value?: unknown): T =>
    typeof value === valueType ||
    (typeof valueType === 'object' && valueType !== null && valueType.constructor)
        ? (value as T)
        : fn()

export const primitiveStringMotherFactory = primitiveMotherFactory('string')

export const userIdPrimitiveMother = primitiveStringMotherFactory(v4)
export const userUsernamePrimitiveMother = primitiveStringMotherFactory(faker.internet.userName)
export const userPasswordPrimitiveMother = primitiveStringMotherFactory(faker.internet.password)
export const userInvalidNumberPasswordPrimitiveMother = primitiveStringMotherFactory(() =>
    randomNumber(10, 18).toString()
)
export const userActivePrimitiveMother = primitiveMotherFactory('boolean')(faker.datatype.boolean)
export const userCreatedAtPrimitiveMother = primitiveMotherFactory(Date)(faker.datatype.datetime)
export const userUpdatedAtPrimitiveMother = primitiveMotherFactory(Date)(faker.datatype.datetime)

export const userPrimitivesMother = (
    userInputOptions?: Partial<{
        id: unknown
        username: unknown
        password: unknown
        active: unknown
        createdAt: unknown
        updatedAt: unknown
    }>
): {
    id: string
    username: string
    password: string
    active: boolean
    createdAt: Date
    updatedAt: Date
} => {
    return {
        id: userIdPrimitiveMother(userInputOptions?.id),
        username: userUsernamePrimitiveMother(userInputOptions?.username),
        password: userPasswordPrimitiveMother(userInputOptions?.password),
        active: userActivePrimitiveMother(userInputOptions?.active),
        createdAt: userCreatedAtPrimitiveMother(userInputOptions?.createdAt),
        updatedAt: userUpdatedAtPrimitiveMother(userInputOptions?.updatedAt)
    }
}
