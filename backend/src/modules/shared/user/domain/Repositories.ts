import { User, UserEntityOptions } from '@/modules/shared/user/domain/User'

export type CreateUser = (userOptions: UserEntityOptions) => Promise<User | null>
