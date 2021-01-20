import { ValueObject } from '@/modules/shared/domain/ValueObject'

const usernameRegex = /^[A-Za-z0-9\-_.]+$/
export class UserUsername extends ValueObject {
    private readonly _value: string

    constructor(value: unknown) {
        super()

        if (typeof value !== 'string' || !usernameRegex.test(value)) {
            throw new InvalidUserUsername()
        }

        this._value = value
    }

    public get value(): string {
        return this._value
    }
}

export class InvalidUserUsername extends Error {
    message = '"username" can contain letters, numbers, ., - and _'

    constructor() {
        super()
    }
}
