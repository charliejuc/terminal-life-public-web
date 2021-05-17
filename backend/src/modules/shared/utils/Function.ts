import R from 'ramda'

export const stringify = (...args: unknown[] | never[]): string => JSON.stringify(args)
export const memoize = R.partial(R.memoizeWith, [stringify])
export const memoizeSimple = R.partial(R.memoizeWith, [R.identity])
