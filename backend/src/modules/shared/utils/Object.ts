export type Dictionary<Keys extends string | number | symbol, Values> = Partial<
    Record<Keys, Values>
>

export type Unknownify<T> = {
    [K in keyof T]: unknown
}
