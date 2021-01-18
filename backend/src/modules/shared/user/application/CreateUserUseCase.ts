export type User = Record<string, unknown>
export type UserOptions = Record<string, unknown>
export type CreateUser = (userOptions: UserOptions) => Promise<User | null>

export async function createUserUseCase(
    createUser: CreateUser,
    userOptions: UserOptions
): Promise<User | { errors: Record<string, string> }> {
    const user = await createUser(userOptions)

    return (
        user ?? {
            errors: []
        }
    )
}

export function createUserUseCaseFactory(
    createUser: CreateUser
): (userOptions: UserOptions) => ReturnType<typeof createUserUseCase> {
    return async (userOptions: UserOptions): ReturnType<typeof createUserUseCase> => {
        return createUserUseCase(createUser, userOptions)
    }
}
