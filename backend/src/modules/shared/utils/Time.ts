export const sleep = (waitMs: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, waitMs))
