import R from 'ramda'

export const stringify = (...args: unknown[] | never[]): string => JSON.stringify(args)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memoize: <Params extends any[], RT>(
    fn: (...args: Params) => RT
) => (...args: Params) => RT = R.partial(R.memoizeWith, [stringify])
