//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Proof of Concept: TypeScript-to-Zod Schema Generation (Approach 1)
 * 
 * This file demonstrates how Approach 1 (TypeScript-to-Zod) could work in practice.
 * It shows a simplified example of generating Zod schemas from TypeScript types.
 * 
 * In a real implementation, this would be automated using tools like ts-to-zod.
 */

import { z, type ZodType } from 'zod'
import type { Patient, Observation } from 'fhir/r4b.js'

/**
 * Example: How a tool like ts-to-zod would generate schemas
 * 
 * Given TypeScript types from @types/fhir, we can programmatically generate
 * corresponding Zod schemas that provide runtime validation.
 */

// ============================================================================
// PROOF OF CONCEPT: Automated Schema Generation
// ============================================================================

/**
 * This is what the automated generator would produce for the Patient resource.
 * The generator would:
 * 1. Parse TypeScript interface definitions
 * 2. Map TypeScript types to Zod schemas
 * 3. Handle arrays, optionals, and nested objects
 * 4. Generate type-safe schemas
 */

// Example of generated schema (would be automated)
export const generatedPatientSchemaExample = z.object({
  resourceType: z.literal('Patient'),
  id: z.string().optional(),
  meta: z.object({
    versionId: z.string().optional(),
    lastUpdated: z.string().optional(),
    source: z.string().optional(),
    profile: z.array(z.string()).optional(),
  }).optional(),
  identifier: z.array(z.object({
    use: z.enum(['usual', 'official', 'temp', 'secondary', 'old']).optional(),
    type: z.object({
      coding: z.array(z.object({
        system: z.string().optional(),
        version: z.string().optional(),
        code: z.string().optional(),
        display: z.string().optional(),
      })).optional(),
      text: z.string().optional(),
    }).optional(),
    system: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  active: z.boolean().optional(),
  name: z.array(z.object({
    use: z.enum(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden']).optional(),
    text: z.string().optional(),
    family: z.string().optional(),
    given: z.array(z.string()).optional(),
    prefix: z.array(z.string()).optional(),
    suffix: z.array(z.string()).optional(),
  })).optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  birthDate: z.string().optional(),
}) satisfies ZodType<Partial<Patient>>

/**
 * Benefits of this approach:
 * 1. Fast generation - automated tools process types in seconds
 * 2. Consistency - all schemas follow same patterns
 * 3. Type safety - schemas are checked against FHIR types
 * 4. Easy updates - regenerate when @types/fhir updates
 */

// ============================================================================
// DEMONSTRATION: Using Generated Schema
// ============================================================================

/**
 * Example usage of the generated schema
 */
export function demonstrateGeneratedSchema() {
  // Valid patient data
  const validPatient = {
    resourceType: 'Patient' as const,
    id: 'patient-123',
    name: [{
      use: 'official' as const,
      family: 'Smith',
      given: ['John', 'Michael'],
    }],
    gender: 'male' as const,
    birthDate: '1980-01-15',
  }

  // Parse and validate
  const result = generatedPatientSchemaExample.safeParse(validPatient)
  
  if (result.success) {
    console.log('✅ Valid patient data')
    console.log('Patient name:', result.data.name?.[0]?.family)
  } else {
    console.log('❌ Invalid patient data:', result.error)
  }

  // Invalid patient data (wrong gender value)
  const invalidPatient = {
    resourceType: 'Patient' as const,
    gender: 'invalid-value', // This will fail validation
  }

  const invalidResult = generatedPatientSchemaExample.safeParse(invalidPatient)
  if (!invalidResult.success) {
    console.log('❌ Validation correctly caught invalid data')
  }
}

// ============================================================================
// GENERATOR CONCEPT: How automation would work
// ============================================================================

/**
 * Pseudo-code showing how an automated generator would work
 * 
 * This is conceptual code showing the logic a real implementation would use.
 * In practice, this would use TypeScript Compiler API or AST parsing.
 */

interface TypeInfo {
  name: string
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'enum' | 'literal'
  optional: boolean
  children?: TypeInfo[]
  enumValues?: string[]
  literalValue?: string
}

/**
 * Conceptual function that would map TypeScript types to Zod schemas
 */
function generateZodSchema(typeInfo: TypeInfo): string {
  let schema = ''

  switch (typeInfo.type) {
    case 'string':
      schema = 'z.string()'
      break
    case 'number':
      schema = 'z.number()'
      break
    case 'boolean':
      schema = 'z.boolean()'
      break
    case 'literal':
      schema = `z.literal('${typeInfo.literalValue}')`
      break
    case 'enum':
      schema = `z.enum([${typeInfo.enumValues?.map(v => `'${v}'`).join(', ')}])`
      break
    case 'array':
      if (typeInfo.children?.[0]) {
        const elementSchema = generateZodSchema(typeInfo.children[0])
        schema = `z.array(${elementSchema})`
      }
      break
    case 'object':
      const fields = typeInfo.children?.map(child => 
        `${child.name}: ${generateZodSchema(child)}`
      ).join(',\n  ')
      schema = `z.object({\n  ${fields}\n})`
      break
  }

  if (typeInfo.optional) {
    schema += '.optional()'
  }

  return schema
}

/**
 * Example of what the generator would produce
 */
export function exampleGeneratorOutput() {
  const patientNameType: TypeInfo = {
    name: 'HumanName',
    type: 'object',
    optional: true,
    children: [
      { name: 'use', type: 'enum', optional: true, enumValues: ['usual', 'official', 'temp', 'nickname'] },
      { name: 'text', type: 'string', optional: true },
      { name: 'family', type: 'string', optional: true },
      { name: 'given', type: 'array', optional: true, children: [{ name: 'item', type: 'string', optional: false }] },
    ],
  }

  console.log('Generated Zod Schema:')
  console.log(generateZodSchema(patientNameType))
}

// ============================================================================
// INTEGRATION EXAMPLE: Build Script
// ============================================================================

/**
 * Example package.json script that would run the generator
 * 
 * {
 *   "scripts": {
 *     "generate:schemas": "ts-to-zod --input node_modules/@types/fhir/r4b.d.ts --output src/generated",
 *     "prebuild": "npm run generate:schemas",
 *     "build": "tsc"
 *   }
 * }
 */

/**
 * Example configuration for ts-to-zod
 * 
 * // ts-to-zod.config.js
 * module.exports = {
 *   input: 'node_modules/@types/fhir/r4b.d.ts',
 *   output: 'src/generated/schemas',
 *   getSchemaName: (identifier) => `${identifier}Schema`,
 *   keepComments: true,
 *   skipParseJSDoc: false,
 * }
 */

// ============================================================================
// LIMITATIONS AND CONSIDERATIONS
// ============================================================================

/**
 * Known limitations of Approach 1:
 * 
 * 1. Choice Types: FHIR has choice types like value[x] which may not translate
 *    directly from TypeScript unions to optimal Zod schemas
 * 
 * 2. Cardinality: TypeScript doesn't encode min/max cardinality constraints
 *    (e.g., "at least 1 item" in array) - these would need custom rules
 * 
 * 3. Value Set Bindings: TypeScript enums may not capture all FHIR value set
 *    bindings and their strength (required/extensible/preferred)
 * 
 * 4. Conditional Requirements: Some FHIR elements are required only when
 *    other elements are present - this logic isn't in TypeScript types
 * 
 * 5. Extensions: FHIR's extension mechanism is very flexible and may need
 *    special handling beyond what TypeScript types provide
 * 
 * Solutions:
 * - Post-processing layer to add FHIR-specific validations
 * - Custom Zod methods for FHIR patterns
 * - Combination with FHIR StructureDefinitions for complete accuracy
 */

/**
 * Example of post-processing to add FHIR-specific validation
 */
export const enhancedPatientSchema = generatedPatientSchemaExample
  .refine(
    (patient) => {
      // Custom FHIR validation: If active is true, must have at least one identifier
      if (patient.active && (!patient.identifier || patient.identifier.length === 0)) {
        return false
      }
      return true
    },
    { message: 'Active patients must have at least one identifier' }
  )
  .refine(
    (patient) => {
      // Custom validation: birthDate must be in the past
      if (patient.birthDate) {
        const birthDate = new Date(patient.birthDate)
        if (birthDate > new Date()) {
          return false
        }
      }
      return true
    },
    { message: 'Birth date cannot be in the future' }
  )

// ============================================================================
// SUMMARY
// ============================================================================

/**
 * Approach 1 (TypeScript-to-Zod) Summary:
 * 
 * Pros:
 * - ⚡ Very fast implementation (1-2 weeks)
 * - 🔄 Automated regeneration
 * - ✅ Good type safety
 * - 📦 Leverages existing @types/fhir package
 * 
 * Cons:
 * - ⚠️ May miss FHIR-specific constraints
 * - 🔧 Requires post-processing for accuracy
 * - 📦 External tool dependency
 * 
 * Best For:
 * - Quick prototyping
 * - Rapid initial implementation
 * - Projects with simpler FHIR validation needs
 * - Teams wanting minimal maintenance overhead
 */
