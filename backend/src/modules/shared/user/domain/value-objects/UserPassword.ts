import argon2 from 'argon2'
import { ValueObject } from '@/modules/shared/domain/ValueObject'

const passwordCharactersMin = 10
const numberRegex = /^[0-9]+$/
export class UserPassword extends ValueObject {
    private readonly _value: string

    constructor(value: unknown) {
        super()

        if (
            typeof value !== 'string' ||
            value.length < passwordCharactersMin ||
            numberRegex.test(value)
        ) {
            throw new InvalidUserPassword()
        }

        this._value = value
    }

    public static async create(passwordString: string): Promise<UserPassword> {
        const password = new this(passwordString)

        const passwordHashed: string = await argon2.hash(password.value)

        return new this(passwordHashed)
    }

    public async verify(passwordToVerify: UserPassword): Promise<Error | null> {
        if (await argon2.verify(this.value, passwordToVerify.value)) {
            return null
        }

        return new UserPasswordVerifyError()
    }

    public get value(): string {
        return this._value
    }
}

export class InvalidUserPassword extends Error {
    message = `"password" should be at least ${passwordCharactersMin} characters long and can\'t contain only numbers`
}

export class UserPasswordVerifyError extends Error {
    message = 'Invalid user password'
}
