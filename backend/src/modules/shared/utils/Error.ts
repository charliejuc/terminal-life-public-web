export function handleFatalError(error?: Error): void {
    if (error == null) {
        return
    }

    console.error(error)
    process.exit(1)
}
