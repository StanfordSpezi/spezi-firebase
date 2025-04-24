/**
 * Schema converter utility for transforming between raw objects and typed classes
 */

import { type z } from 'zod'

/**
 * A utility class for converting between domain objects and schema-validated data
 * This class allows for bidirectional conversion:
 * 1. Input data -> Domain object (via schema validation)
 * 2. Domain object -> Data (via encode function)
 */
export class SchemaConverter<T, S extends z.ZodType = z.ZodType> {
  readonly schema: S
  readonly encode: (obj: T) => z.output<S>

  constructor(input: { schema: S; encode: (obj: T) => z.output<S> }) {
    this.schema = input.schema
    this.encode = input.encode
  }
}
