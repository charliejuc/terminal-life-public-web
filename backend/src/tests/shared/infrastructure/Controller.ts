import R from 'ramda'

export const resolveBody = R.ifElse(
    R.is(Object),
    (value: Record<string, unknown>) => JSON.stringify(value),
    R.identity
)
