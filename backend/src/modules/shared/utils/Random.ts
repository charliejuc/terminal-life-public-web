export const randomNumber = (minLength: number, maxLength?: number): number => {
    if (minLength < 0 || !Number.isInteger(minLength)) {
        throw new Error(`minLength should be an integer greater than 0. "${minLength}" passed`)
    }

    maxLength = maxLength ?? minLength

    if (maxLength <= minLength || !Number.isInteger(maxLength)) {
        throw new Error(
            `maxLength should be an integer greater than minLength. "${minLength}" passed`
        )
    }

    if (maxLength > 18) {
        console.warn(`Warning!!! Unexpected behaviour with maxLength greater than 18`)
    }

    const length = minLength + Math.floor(Math.random() * (maxLength - minLength))

    return Math.floor(Math.random() * 10 ** length)
}
