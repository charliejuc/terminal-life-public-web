import { User, UserEntityOptions, UserInputOptions } from '@/modules/shared/user/domain/User'
import { UserId } from '@/modules/shared/user/domain/value-objects/UserId'
import * as ValueObjectUtils from '@/modules/shared/utils/ValueObject'
import { UserActive } from '../domain/value-objects/UserActive'
import { UserCreatedAt } from '../domain/value-objects/UserCreatedAt'
import { UserPassword } from '../domain/value-objects/UserPassword'
import { UserUpdatedAt } from '../domain/value-objects/UserUpdatedAt'
import { UserUsername } from '../domain/value-objects/UserUsername'

export type CreateUser = (userOptions: UserEntityOptions) => Promise<User | null>

const userIdCatcher = ValueObjectUtils.catcher(UserId)('id')
const userUsernameCatcher = ValueObjectUtils.catcher(UserUsername)('username')
const userPasswordCatcher = ValueObjectUtils.catcherNamedConstructorP(
    UserPassword.create.bind(UserPassword)
)('password')
const userActiveCatcher = ValueObjectUtils.catcher(UserActive)('active')
const userCreatedAtCatcher = ValueObjectUtils.catcher(UserCreatedAt)('createdAt')
const userUpdatedAtCatcher = ValueObjectUtils.catcher(UserUpdatedAt)('updatedAt')
export async function createUserUseCase(
    createUser: CreateUser,
    userOptions: Partial<Omit<UserInputOptions, 'createdAt' | 'updatedAt'>>
): Promise<User | { errors: Record<string, string> }> {
    const id = userIdCatcher(userOptions.id)
    const username = userUsernameCatcher(userOptions.username)
    const password = await userPasswordCatcher(userOptions.password)
    const active = userActiveCatcher(userOptions.active)
    const createdAt = userCreatedAtCatcher(new Date())
    const updatedAt = userUpdatedAtCatcher(new Date())

    const { cleanedValueObjects, errors } = ValueObjectUtils.resolver<UserEntityOptions>({
        id,
        username,
        password,
        active,
        createdAt,
        updatedAt
    })

    if (Object.keys(errors).length > 0) {
        return {
            errors
        }
    }

    const valueObjects = cleanedValueObjects as UserEntityOptions

    const user = await createUser(valueObjects)

    return (
        user ?? {
            errors: {}
        }
    )
}

export function createUserUseCaseFactory(
    createUser: CreateUser
): (userOptions: Partial<UserInputOptions>) => ReturnType<typeof createUserUseCase> {
    return async (userOptions: Partial<UserInputOptions>): ReturnType<typeof createUserUseCase> => {
        return createUserUseCase(createUser, userOptions)
    }
}
