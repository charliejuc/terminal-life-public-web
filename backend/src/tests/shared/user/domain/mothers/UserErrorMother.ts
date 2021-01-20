import R from 'ramda'
import { InvalidUserId } from '@/modules/shared/user/domain/value-objects/UserId'
import { InvalidUserUsername } from '@/modules/shared/user/domain/value-objects/UserUsername'
import { InvalidUserPassword } from '@/modules/shared/user/domain/value-objects/UserPassword'
import { InvalidUserActive } from '@/modules/shared/user/domain/value-objects/UserActive'
import { InvalidUserCreatedAt } from '@/modules/shared/user/domain/value-objects/UserCreatedAt'
import { InvalidUserUpdatedAt } from '@/modules/shared/user/domain/value-objects/UserUpdatedAt'

const constructGetMessage = <ClassType extends new (...args: never[]) => { message: string }>(
    _class: ClassType
): ((...args: ConstructorParameters<typeof _class>) => string) =>
    R.pipe(R.construct(_class), R.prop('message'))

export const invalidUserIdMotherMessage = constructGetMessage(InvalidUserId)
export const invalidUserUsernameMotherMessage = constructGetMessage(InvalidUserUsername)
export const invalidUserPasswordMotherMessage = constructGetMessage(InvalidUserPassword)
export const invalidUserActiveMotherMessage = constructGetMessage(InvalidUserActive)
export const invalidUserCreatedAtMotherMessage = constructGetMessage(InvalidUserCreatedAt)
export const invalidUserUpdatedAtMotherMessage = constructGetMessage(InvalidUserUpdatedAt)
