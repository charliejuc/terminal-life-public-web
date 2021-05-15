import { UserId } from '@/modules/shared/user/domain/value-objects/UserId'
import { Entity } from '@/modules/shared/domain/Entity'
import { ValueObject } from '@/modules/shared/domain/ValueObject'
import { UserUsername } from './value-objects/UserUsername'
import { UserPassword } from './value-objects/UserPassword'
import { UserActive } from './value-objects/UserActive'
import { UserCreatedAt } from './value-objects/UserCreatedAt'
import { UserUpdatedAt } from './value-objects/UserUpdatedAt'
import { Unknownify } from '../../utils/Object'
import { ValueObjectsValueType } from '../../utils/ValueObject'

export interface UserEntityOptions {
    id: UserId
    username: UserUsername
    password: UserPassword
    active: UserActive
    createdAt: UserCreatedAt
    updatedAt: UserUpdatedAt
}

export type UserOptions = ValueObjectsValueType<UserEntityOptions>

export type UserInputOptions = Unknownify<UserEntityOptions>

export class User extends Entity implements UserOptions {
    private readonly _id: UserId
    private readonly _username: UserUsername
    private readonly _password: UserPassword
    private readonly _active: UserActive
    private readonly _createdAt: UserCreatedAt
    private readonly _updatedAt: UserUpdatedAt

    constructor(userOptions: UserEntityOptions) {
        super()

        this._id = userOptions.id
        this._username = userOptions.username
        this._password = userOptions.password
        this._active = userOptions.active
        this._createdAt = userOptions.createdAt
        this._updatedAt = userOptions.updatedAt
    }

    public static fromPrimitives(userOptions: UserOptions): User {
        return new this({
            id: new UserId(userOptions.id),
            username: new UserUsername(userOptions.username),
            password: new UserPassword(userOptions.password),
            active: new UserActive(userOptions.active),
            createdAt: new UserCreatedAt(userOptions.createdAt),
            updatedAt: new UserUpdatedAt(userOptions.updatedAt)
        })
    }

    public get id(): string {
        return this._id.value
    }

    public get username(): string {
        return this._username.value
    }

    public get password(): string {
        return this._password.value
    }

    public get active(): boolean {
        return this._active.value
    }

    public get createdAt(): Date {
        return this._createdAt.value
    }

    public get updatedAt(): Date {
        return this._updatedAt.value
    }

    public toValueObjects(): UserEntityOptions & Record<string, ValueObject> {
        return {
            id: this._id,
            username: this._username,
            password: this._password,
            active: this._active,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        }
    }

    public toPrimitives(): UserOptions & Record<string, unknown> {
        return {
            id: this._id.value,
            username: this._username.value,
            password: this._password.value,
            active: this._active.value,
            createdAt: this._createdAt.value,
            updatedAt: this._updatedAt.value
        }
    }
}
