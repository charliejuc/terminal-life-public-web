import R from 'ramda'
import { ValueObject } from '../domain/ValueObject'

export type ValueObjectsValueType<T> = {
    [K in keyof T]: T[K] extends ValueObject ? T[K]['value'] : never
}

export const catcher =
    <T>(_class: new (value: unknown) => T) =>
    (key: string): ((value: unknown) => T | { errors: Record<string, string> }) =>
        R.tryCatch(
            R.construct(_class),
            R.pipe(R.unary(R.prop)('message'), R.assocPath(['errors', key], R.__, { errors: {} }))
        )

export const catcherNamedConstructorP =
    <T>(namedConstructor: (value: unknown) => Promise<T>) =>
    (key: string) =>
    async (
        value: unknown
    ): Promise<ReturnType<typeof namedConstructor> | { errors: Record<string, string> }> => {
        try {
            return await namedConstructor(value)
        } catch (error) {
            return {
                errors: {
                    [key]: error.message
                }
            }
        }
    }

const _cleanValueObjectsAndErrors = <EntityOptions>(
    acc: ReturnType<typeof resolver>,
    currentValueObjectKey: keyof EntityOptions
): ((
    value: EntityOptions[keyof EntityOptions] | { errors: Record<string, string> }
) => typeof acc) =>
    R.ifElse(
        R.has('errors'),
        R.pipe(R.prop('errors'), R.assoc('errors', R.__, acc)),
        R.assocPath(['cleanedValueObjects', currentValueObjectKey as string], R.__, acc)
    )
export const resolver = <EntityOptions>(
    valueObjects: Record<
        keyof EntityOptions,
        EntityOptions[keyof EntityOptions] | { errors: Record<string, string> }
    >
): {
    cleanedValueObjects: Partial<EntityOptions>
    errors: Record<string, string>
} =>
    R.reduce(
        (acc: ReturnType<typeof resolver>, currentValueObjectKey: keyof EntityOptions) =>
            _cleanValueObjectsAndErrors<EntityOptions>(
                acc,
                currentValueObjectKey
            )(valueObjects[currentValueObjectKey]),
        {
            cleanedValueObjects: {},
            errors: {}
        }
    )(Object.keys(valueObjects) as Array<keyof EntityOptions>)
