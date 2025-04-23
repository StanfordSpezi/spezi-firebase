/**
 * Schema converter utility for transforming between raw objects and typed classes
 */

import { type z } from 'zod'

export class SchemaConverter<T, S extends z.ZodType> {
  readonly schema: S
  readonly encode: (obj: T) => z.output<S>

  constructor(input: { schema: S; encode: (obj: T) => z.output<S> }) {
    this.schema = input.schema
    this.encode = input.encode
  }
}
