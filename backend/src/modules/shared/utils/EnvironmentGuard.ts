import R from 'ramda'
import { Environments } from '../types/Config'

const NODE_ENV = R.memoizeWith(R.toString, (NODE_ENV: string | undefined): Environments => {
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
