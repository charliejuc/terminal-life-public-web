export function requestBodyParser(body: unknown): Record<string, unknown> {
    if (typeof body !== 'string') {
        return {}
    }

    try {
        return JSON.parse(body)
    } catch (error) {
        return {}
    }
}
