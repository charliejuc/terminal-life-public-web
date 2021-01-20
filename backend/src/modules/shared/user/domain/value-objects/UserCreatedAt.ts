import { ValueObject } from '@/modules/shared/domain/ValueObject'
import { isValidDate } from '@/modules/shared/utils/Date'

export class UserCreatedAt extends ValueObject {
    private readonly _value: Date

    constructor(value: unknown) {
        super()

        if (!isValidDate(value)) {
            throw new InvalidUserCreatedAt()
        }

        this._value = value
    }

    public get value(): Date {
        return this._value
    }
}

export class InvalidUserCreatedAt extends Error {
    message = '"createdAt" should be a valid date'
}
