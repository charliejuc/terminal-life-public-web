import R from 'ramda'

export const requestBodyParser: (body: unknown) => Record<string, unknown> = R.ifElse(
    R.pipe(R.type, R.equals('String')),
    R.tryCatch((value: string) => JSON.parse(value), R.always({})),
    R.ifElse(R.pipe(R.type, R.equals('Object')), R.identity, R.always({}))
)
