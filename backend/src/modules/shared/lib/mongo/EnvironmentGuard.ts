import R from 'ramda'
import { isDevelopment } from '../../utils/EnvironmentGuard'
import { stringify } from '../../utils/Function'

const isValidEnvVariable = R.anyPass([R.isNil, R.pipe(R.trim, R.equals(''))])
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
        R.ifElse(
            isValidEnvVariable,
            () => {
                throw new Error('Environment variable "MONGO_DATABASE" is required')
            },
            R.identity
        )
    )
)
