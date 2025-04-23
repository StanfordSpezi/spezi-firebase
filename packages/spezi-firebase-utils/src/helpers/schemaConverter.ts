import { type z } from 'zod'
import { type Lazy } from './lazy.js'

/**
 * Generic schema converter for type-safe data transformation.
 * Uses Zod for schema validation and provides encoding functionality.
 */
export class SchemaConverter<Schema extends z.ZodTypeAny, Encoded> {
  readonly schema: Schema
  readonly encode: (value: z.output<Schema>) => Encoded

  get value(): this {
    return this
  }

  constructor(input: {
    schema: Schema
    encode: (value: z.output<Schema>) => Encoded
  }) {
    this.schema = input.schema
    this.encode = input.encode
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type InferEncoded<Input> =
  Input extends SchemaConverter<any, any> ? ReturnType<Input['encode']>
  : Input extends Lazy<SchemaConverter<any, any>> ?
    ReturnType<Input['value']['encode']>
  : never
/* eslint-enable @typescript-eslint/no-explicit-any */