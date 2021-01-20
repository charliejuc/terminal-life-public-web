import R from 'ramda'

export const motherFactory = <T>(_class: new (value: unknown) => T) => (
    primitiveMotherFn: (value?: unknown) => unknown
) => (value: unknown = null): T =>
    R.pipe((value: unknown) => primitiveMotherFn(value), R.construct(_class))(value)
