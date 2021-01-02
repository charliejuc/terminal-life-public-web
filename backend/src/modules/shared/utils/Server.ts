import R from 'ramda'

const stringIsNumber: (value: string) => boolean = R.pipe(
    R.anyPass([isNaN, R.pipe(Number, R.equals(0))]),
    R.not
)
export const getPortOrFail = (): number =>
    R.ifElse(stringIsNumber, Number, (value: string | undefined) => {
        throw new Error(`Invalid SERVER_PORT: "${value}"`)
    })(process.env.SERVER_PORT ?? '')
