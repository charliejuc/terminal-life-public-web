import { User, UserEntityOptions } from '@/modules/shared/user/domain/User'
import { UserId } from './value-objects/UserId'

export type CreateUser = (userOptions: UserEntityOptions) => Promise<User | null>
export type GetUserById = (id: UserId) => Promise<User | null>
