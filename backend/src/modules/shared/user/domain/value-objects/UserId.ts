import { ValueObject } from '@/modules/shared/domain/ValueObject'
import { isUUID } from '@/modules/shared/utils/Validation'

export class UserId extends ValueObject {
    private readonly _value: string

    constructor(value: unknown) {
        super()

        if (!isUUID(value)) {
            throw new InvalidUserId()
        }

        this._value = value
    }

    public get value(): string {
        return this._value
    }
}

export class InvalidUserId extends Error {
    message = '"UserId" should be an UUID'

    constructor() {
        super()
    }
}
