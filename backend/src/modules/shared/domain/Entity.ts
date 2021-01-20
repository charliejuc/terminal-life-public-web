import { ValueObject } from '@/modules/shared/domain/ValueObject'

export abstract class Entity {
    abstract toValueObjects(): Record<string, ValueObject>
    abstract toPrimitives(): Record<string, unknown>
}
