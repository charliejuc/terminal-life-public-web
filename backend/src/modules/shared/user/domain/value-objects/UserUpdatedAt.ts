import { ValueObject } from '@/modules/shared/domain/ValueObject'
import { isValidDate } from '@/modules/shared/utils/Date'

export class UserUpdatedAt extends ValueObject {
    private readonly _value: Date

    constructor(value: unknown) {
        super()

        if (!isValidDate(value)) {
            throw new InvalidUserUpdatedAt()
        }

        this._value = value
    }

    public get value(): Date {
        return this._value
    }
}

export class InvalidUserUpdatedAt extends Error {
    message = '"updatedAt" should be a valid date'
}
