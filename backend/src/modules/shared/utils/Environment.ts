const environments = ['production', 'development']
if (!environments.includes(process.env.NODE_ENV ?? '')) {
    throw new Error(
        `Invalid NODE_ENV: "process.env.NODE_ENV". Allowed values: "${environments.join(',')}"`
    )
}

export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'
