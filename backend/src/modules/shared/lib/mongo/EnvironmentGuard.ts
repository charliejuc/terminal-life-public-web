import { memoizeSimple } from '../../utils/Function'

export const MONGO_DATABASE = memoizeSimple((MONGO_DATABASE: string): string => {
    if (MONGO_DATABASE?.trim() === '') {
        throw new Error('Environment variable "MONGO_DATABASE" is required')
    }

    return MONGO_DATABASE
})

export const MONGO_USERNAME = memoizeSimple((MONGO_USERNAME: string): string => {
    if (MONGO_USERNAME?.trim() === '') {
        throw new Error('Environment variable "MONGO_USERNAME" is required')
    }

    return MONGO_USERNAME
})

export const MONGO_PASSWORD = memoizeSimple((MONGO_PASSWORD: string): string => {
    if (MONGO_PASSWORD?.trim() === '') {
        throw new Error('Environment variable "MONGO_PASSWORD" is required')
    }

    return MONGO_PASSWORD
})

export const MONGO_HOST = memoizeSimple((MONGO_HOST: string): string => {
    if (MONGO_HOST?.trim() === '') {
        throw new Error('Environment variable "MONGO_HOST" is required')
    }

    return MONGO_HOST
})

export const MONGO_PORT = memoizeSimple((MONGO_PORT: string): string => {
    if (MONGO_PORT?.trim() === '') {
        throw new Error('Environment variable "MONGO_PORT" is required')
    }

    return MONGO_PORT
})
