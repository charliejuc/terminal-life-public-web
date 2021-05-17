import R from 'ramda'

export const randomInt: (minOrMax: number, max?: number) => number = R.ifElse(
    R.pipe(R.nthArg(1), R.type, R.equals('Undefined')),
    (value: number) => Math.floor(Math.random() * value),
    (min: number, max: number) => min + Math.floor(Math.random() * (max - min))
)

export const randomNumber = (minLength: number, maxLength?: number): number => {
    if (minLength <= 0 || !Number.isInteger(minLength)) {
        throw new Error(`minLength should be an integer greater than 0. "${minLength}" passed`)
    }

    maxLength = maxLength ?? minLength

    if (maxLength < minLength || !Number.isInteger(maxLength)) {
        throw new Error(
            `maxLength should be an integer greater than minLength. "${minLength}" passed`
        )
    }

    if (maxLength > 18) {
        console.warn(`Warning!!! Unexpected behaviour with maxLength greater than 18`)
    }

    const length = randomInt(minLength, maxLength)

    return Math.floor(Math.random() * 10 ** length)
}

export const shortRandomString = (): string => Math.random().toString(32).slice(2)
const _randomString = (minLength: number, maxLength: number): ((str: string) => string) => {
    const recall = _randomString(minLength, maxLength)

    return R.ifElse(
        R.pipe(R.length, R.gte(R.__, maxLength)),
        R.slice(0, randomInt(minLength, maxLength)),
        (str: string) => recall(`${str}${shortRandomString()}`)
    )
}
export const randomString = (minLength: number, maxLength?: number): string => {
    if (minLength <= 0 || !Number.isInteger(minLength)) {
        throw new Error(`minLength should be an integer greater than 0. "${minLength}" passed`)
    }

    maxLength = maxLength ?? minLength

    if (maxLength < minLength || !Number.isInteger(maxLength)) {
        throw new Error(
            `maxLength should be an integer greater than minLength. "${minLength}" passed`
        )
    }

    const randomString = ''
    return _randomString(minLength, maxLength)(randomString)
}
