export function handleFatalError(error?: Error): void {
    if (error == null) {
        return
    }

    console.error('[FATAL ERROR]:', error)
    process.exit(1)
}
