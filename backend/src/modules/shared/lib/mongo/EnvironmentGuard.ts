import R from 'ramda'
import {
    isDevelopment,
    isValidEnvNumberVariable,
    isValidEnvVariable
} from '../../utils/EnvironmentGuard'
import { memoize } from '../../utils/Function'

export const environmentOrDefault: <DefaultValue, R extends DefaultValue | undefined>(
    envVariable: string | undefined,
    defaultValue: DefaultValue,
    returnDefault: boolean
) => R = R.ifElse(
    R.pipe(R.nthArg(2), R.ifElse(R.isNil, R.always(isDevelopment), R.identity)),
    R.ifElse(isValidEnvVariable, /*envVariable*/ R.nthArg(0), /*defaultValue*/ R.nthArg(1)),
    /*envVariable*/ R.nthArg(0)
)

export const MONGO_DATABASE: (
    envVariable: string | undefined,
    defaultValue: string,
    _isDevelopment: boolean
) => string = memoize(
    R.pipe(
        environmentOrDefault,
        R.ifElse(isValidEnvVariable, R.identity, () => {
            throw new Error('Environment variable "MONGO_DATABASE" is required')
        })
    )
)

export const MONGO_USERNAME: (
    envVariable: string | undefined,
    defaultValue: string,
    _isDevelopment: boolean
) => string = memoize(
    R.pipe(
        environmentOrDefault,
        R.ifElse(isValidEnvVariable, R.identity, () => {
            throw new Error('Environment variable "MONGO_USERNAME" is required')
        })
    )
)

export const MONGO_PASSWORD: (
    envVariable: string | undefined,
    defaultValue: string,
    _isDevelopment: boolean
) => string = memoize(
    R.pipe(
        environmentOrDefault,
        R.ifElse(isValidEnvVariable, R.identity, () => {
            throw new Error('Environment variable "MONGO_PASSWORD" is required')
        })
    )
)

export const MONGO_HOST: (
    envVariable: string | undefined,
    defaultValue: string,
    _isDevelopment: boolean
) => string = memoize(
    R.pipe(
        environmentOrDefault,
        R.ifElse(isValidEnvVariable, R.identity, () => {
            throw new Error('Environment variable "MONGO_HOST" is required')
        })
    )
)

export const MONGO_PORT: (envVariable: string | undefined, defaultValue: number) => number =
    memoize(
        R.pipe(
            (envVariable: string | undefined, defaultValue: number) =>
                environmentOrDefault(envVariable, defaultValue.toString(), /*returnDefault*/ true),
            R.ifElse(isValidEnvNumberVariable, R.pipe(R.identity, Number), (value: string) => {
                throw new Error(`Environment variable "MONGO_PORT" is invalid: "${value}"`)
            })
        )
    )
