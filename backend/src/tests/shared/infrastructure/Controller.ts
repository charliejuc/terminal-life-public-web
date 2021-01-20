import R from 'ramda'

export const resolveBody = R.ifElse(
    R.pipe(R.type, R.equals('Object')),
    (value: Record<string, unknown>) => JSON.stringify(value),
    R.identity
)
