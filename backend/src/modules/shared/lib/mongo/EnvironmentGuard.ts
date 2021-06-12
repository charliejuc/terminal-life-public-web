import R from 'ramda'
import {
    isDevelopment,
    isValidEnvNumberVariable,
    isValidEnvVariable
} from '../../utils/EnvironmentGuard'
import { stringify } from '../../utils/Function'

export const environmentOrDefault: <DefaultValue, R extends DefaultValue | undefined>(
    envVariable: string | undefined,
    defaultValue: DefaultValue,
    _isDevelopment?: boolean
) => R = R.ifElse(
    R.pipe(R.nthArg(2), R.ifElse(R.isNil, R.always(isDevelopment), R.identity)),
    R.ifElse(isValidEnvVariable, R.nthArg(1), R.nthArg(0)),
    R.nthArg(0)
)

export const MONGO_DATABASE: <DefaultValue, R extends DefaultValue>(
    envVariable: string | undefined,
    defaultValue: DefaultValue,
    _isDevelopment?: boolean
) => R = R.memoizeWith(
    stringify,
    R.pipe(
        environmentOrDefault,
        R.ifElse(isValidEnvVariable, R.identity, () => {
            throw new Error('Environment variable "MONGO_DATABASE" is required')
        })
    )
)

export const MONGO_USERNAME: <DefaultValue, R extends DefaultValue>(
    envVariable: string | undefined,
    defaultValue: DefaultValue,
    _isDevelopment?: boolean
) => R = R.memoizeWith(
    stringify,
    R.pipe(
        environmentOrDefault,
        R.ifElse(isValidEnvVariable, R.identity, () => {
            throw new Error('Environment variable "MONGO_USERNAME" is required')
        })
    )
)

export const MONGO_PASSWORD: <DefaultValue, R extends DefaultValue>(
    envVariable: string | undefined,
    defaultValue: DefaultValue,
    _isDevelopment?: boolean
) => R = R.memoizeWith(
    stringify,
    R.pipe(
        environmentOrDefault,
        R.ifElse(isValidEnvVariable, R.identity, () => {
            throw new Error('Environment variable "MONGO_PASSWORD" is required')
        })
    )
)

export const MONGO_HOST: <DefaultValue, R extends DefaultValue>(
    envVariable: string | undefined,
    defaultValue: DefaultValue,
    _isDevelopment?: boolean
) => R = R.memoizeWith(
    stringify,
    R.pipe(
        environmentOrDefault,
        R.ifElse(isValidEnvVariable, R.identity, () => {
            throw new Error('Environment variable "MONGO_HOST" is required')
        })
    )
)

export const MONGO_PORT: <DefaultValue, R extends DefaultValue>(
    envVariable: string | undefined,
    defaultValue: DefaultValue,
    _isDevelopment?: boolean
) => R = R.memoizeWith(
    stringify,
    R.pipe(
        environmentOrDefault,
        R.ifElse(isValidEnvNumberVariable, R.identity, () => {
            throw new Error('Environment variable "MONGO_PORT" is required and should be a number')
        })
    )
)
