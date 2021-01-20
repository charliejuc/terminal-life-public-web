import { UserId } from '@/modules/shared/user/domain/value-objects/UserId'
import { User, UserInputOptions } from '@/modules/shared/user/domain/User'
import {
    userActivePrimitiveMother,
    userCreatedAtPrimitiveMother,
    userIdPrimitiveMother,
    userPasswordPrimitiveMother,
    userUpdatedAtPrimitiveMother,
    userUsernamePrimitiveMother
} from '@/tests/shared/user/domain/mothers/UserPrimitivesMother'
import { motherFactory } from '@/tests/shared/domain/Mother'
import { UserUsername } from '@/modules/shared/user/domain/value-objects/UserUsername'
import { UserPassword } from '@/modules/shared/user/domain/value-objects/UserPassword'
import { UserActive } from '@/modules/shared/user/domain/value-objects/UserActive'
import { UserCreatedAt } from '@/modules/shared/user/domain/value-objects/UserCreatedAt'
import { UserUpdatedAt } from '@/modules/shared/user/domain/value-objects/UserUpdatedAt'

export const userIdMother = motherFactory(UserId)(userIdPrimitiveMother)
export const userUsernameMother = motherFactory(UserUsername)(userUsernamePrimitiveMother)
export const userPasswordMother = motherFactory(UserPassword)(userPasswordPrimitiveMother)
export const userActiveMother = motherFactory(UserActive)(userActivePrimitiveMother)
export const userCreatedAtMother = motherFactory(UserCreatedAt)(userCreatedAtPrimitiveMother)
export const userUpdatedAtMother = motherFactory(UserUpdatedAt)(userUpdatedAtPrimitiveMother)

export const userMother = (userInputOptions?: Partial<UserInputOptions>): User => {
    return new User({
        id: userIdMother(userInputOptions?.id),
        username: userUsernameMother(userInputOptions?.username),
        password: userPasswordMother(userInputOptions?.password),
        active: userActiveMother(userInputOptions?.active),
        createdAt: userCreatedAtMother(userInputOptions?.createdAt),
        updatedAt: userUpdatedAtMother(userInputOptions?.updatedAt)
    })
}
