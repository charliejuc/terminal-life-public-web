import R from 'ramda'

export const requestBodyParser: (body: unknown) => Record<string, unknown> = R.ifElse(
    R.is(String),
    R.tryCatch((value: string) => JSON.parse(value), R.always({})),
    R.ifElse(R.both(R.is(Object), R.pipe(R.type, R.equals('Object'))), R.identity, R.always({}))
)
