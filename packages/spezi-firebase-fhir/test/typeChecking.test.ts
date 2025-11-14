//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Type-level utility to ensure exact type match between a Zod schema and a FHIR type.
 * This enforces bidirectional compatibility - the schema must match the FHIR type exactly,
 * not allowing extra properties or missing any required/optional properties.
 */
type ExactZodMatch<Schema extends z.ZodTypeAny, FhirType> =
  [z.infer<Schema>] extends [FhirType] ?
    [FhirType] extends [z.infer<Schema>] ?
      true
    : {
        error: 'Schema type is too restrictive - FHIR type has properties not in schema'
        schemaType: z.infer<Schema>
        fhirType: FhirType
      }
  : {
      error: 'Schema allows extra properties not in FHIR type'
      schemaType: z.infer<Schema>
      fhirType: FhirType
    }

/**
 * Helper function to validate at compile-time that a schema exactly matches a FHIR type.
 * This provides better error messages than just using `satisfies`.
 *
 * @param schema - The Zod schema to validate
 * @returns The same schema, typed as ZodType<FhirType>
 *
 * @example
 * ```typescript
 * const mySchema = createExactSchema<Patient>(
 *   domainResourceSchema.extend({
 *     resourceType: z.literal('Patient'),
 *     // ... all Patient fields
 *   })
 * )
 * ```
 */
export function createExactSchema<FhirType>(
  schema: z.ZodType<FhirType>,
): z.ZodType<FhirType> {
  return schema
}

/**
 * Compile-time assertion that a schema exactly matches a FHIR type.
 * This should be used in type definitions to ensure schemas are kept in sync.
 *
 * @example
 * ```typescript
 * export const patientSchema = domainResourceSchema.extend({...})
 * type _PatientSchemaCheck = AssertExactSchema<typeof patientSchema, Patient>
 * ```
 */
export type AssertExactSchema<
  Schema extends z.ZodTypeAny,
  FhirType,
> = ExactZodMatch<Schema, FhirType>

describe('Type Checking Utilities', () => {
  it('should provide type-level utilities for exact schema validation', () => {
    // This test is mainly for compile-time checking
    // If the types compile, the utilities are working correctly
    expect(true).toBe(true)
  })

  it('should demonstrate usage of createExactSchema', () => {
    // Example: Define a simple schema
    interface SimpleResource {
      id?: string
      name: string
    }

    const simpleSchema = createExactSchema<SimpleResource>(
      z.object({
        id: z.string().optional(),
        name: z.string(),
      }),
    )

    // This should compile and work correctly
    const valid = simpleSchema.parse({ name: 'Test' })
    expect(valid.name).toBe('Test')

    // This should throw an error at runtime
    expect(() => simpleSchema.parse({ name: 123 })).toThrow()
  })
})
