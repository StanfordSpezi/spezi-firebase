//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type z } from 'zod'
import { type Lazy } from './lazy.js'

/**
 * Generic schema converter for type-safe data transformation.
 * Uses Zod for schema validation and provides encoding functionality.
 */
export class SchemaConverter<Schema extends z.ZodTypeAny, Encoded> {
  /**
   * Zod schema for validation
   */
  readonly schema: Schema
  /**
   * Encoding function to convert validated output to encoded format
   */
  readonly encode: (value: z.output<Schema>) => Encoded

  /**
   * Gets the converter instance itself (for lazy initialization patterns)
   * @returns This converter instance
   */
  get value(): this {
    return this
  }

  /**
   * Creates a new SchemaConverter instance
   * @param input Configuration object with schema and encode function
   * @param input.schema The Zod schema for validation
   * @param input.encode Function to encode validated output
   */
  constructor(input: {
    schema: Schema
    encode: (value: z.output<Schema>) => Encoded
  }) {
    this.schema = input.schema
    this.encode = input.encode
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Infer the encoded type from a SchemaConverter or Lazy<SchemaConverter>
 */
export type InferEncoded<Input> =
  Input extends SchemaConverter<any, any> ? ReturnType<Input['encode']>
  : Input extends Lazy<SchemaConverter<any, any>> ?
    ReturnType<Input['value']['encode']>
  : never
/* eslint-enable @typescript-eslint/no-explicit-any */
