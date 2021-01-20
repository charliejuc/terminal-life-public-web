import { ValueObject } from '@/modules/shared/domain/ValueObject'

export class UserActive extends ValueObject {
    private readonly _value: boolean

    constructor(value: unknown) {
        super()

        if (typeof value !== 'boolean') {
            throw new InvalidUserActive()
        }

        this._value = value
    }

    public get value(): boolean {
        return this._value
    }
}

export class InvalidUserActive extends Error {
    message = '"active" should be true or false'
}
