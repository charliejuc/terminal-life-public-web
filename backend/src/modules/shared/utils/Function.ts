import R from 'ramda'
import { randomString } from './Random'

export const stringify = (...args: unknown[] | never[]): string => JSON.stringify(args)
export const memoize = R.partial(R.memoizeWith, [stringify])
export const memoizeSimple = R.partial(R.memoizeWith, [R.identity])
export const returnAlwaysFirstResult = (fn: (...args: never[]) => unknown) =>
    R.memoizeWith(R.always(randomString(9)), fn as (...args: unknown[]) => unknown)
