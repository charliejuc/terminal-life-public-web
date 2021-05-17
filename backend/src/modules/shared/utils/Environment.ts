import { Environments } from '../types/Config'
import { returnAlwaysFirstResult } from './Function'

const NODE_ENV = returnAlwaysFirstResult((NODE_ENV: string | undefined): Environments => {
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

export const MONGO_DATABASE = returnAlwaysFirstResult((MONGO_DATABASE: string): string => {
    if (MONGO_DATABASE?.trim() === '') {
        throw new Error('Environment variable "MONGO_DATABASE" is required')
    }

    return MONGO_DATABASE
})
