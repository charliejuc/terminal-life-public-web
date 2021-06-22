import R from 'ramda'
import { Environments } from '../types/Config'
import { memoize } from './Function'

export const isValidEnvVariable = R.complement(R.anyPass([R.isNil, R.pipe(R.trim, R.equals(''))]))
export const isValidEnvNumberVariable = R.both(
    isValidEnvVariable,
    R.pipe(Number, R.both(R.is(Number), R.complement(R.identical(NaN))))
)

const NODE_ENV = memoize((NODE_ENV: string | undefined): Environments => {
    const environments: Environments[] = ['development', 'production']
    if (!(environments as string[]).includes(NODE_ENV ?? '')) {
        throw new Error(
            `Invalid NODE_ENV: "process.env.NODE_ENV". Allowed values: "${environments.join(',')}"`
        )
    }

    return NODE_ENV as Environments
})
export const isDevelopment = NODE_ENV(process.env.NODE_ENV) === 'development'
export const isProduction = NODE_ENV(process.env.NODE_ENV) === 'production'
