import R from 'ramda'

const UUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const _isUUID = R.allPass([R.is(String), R.test(UUIDRegex)])

export function isUUID(value: unknown): value is string {
    return _isUUID(value)
}
