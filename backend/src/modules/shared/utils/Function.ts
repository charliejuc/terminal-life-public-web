import R from 'ramda'

export const stringify = (...args: unknown[] | never[]): string => JSON.stringify(args)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memoize: <Params extends any[], RT>(
    fn: (...args: Params) => RT
) => (...args: Params) => RT = R.partial(R.memoizeWith, [stringify])

export const trampoline =
    <Args extends unknown[], R>(fn: (...args: Args) => R) =>
    (...args: Args): R => {
        let result = fn(...args)

        while (typeof result === 'function') {
            result = result()
        }

        return result
    }
