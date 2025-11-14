//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

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
  /**
   * Zod schema for validation
   */
  readonly schema: S
  /**
   * Encoding function to convert domain object to data
   */
  readonly encode: (obj: T) => z.output<S>

  /**
   * Creates a new SchemaConverter instance
   * @param input Configuration object with schema and encode function
   * @param input.schema The Zod schema for validation
   * @param input.encode Function to encode validated output
   */
  constructor(input: { schema: S; encode: (obj: T) => z.output<S> }) {
    this.schema = input.schema
    this.encode = input.encode
  }
}
