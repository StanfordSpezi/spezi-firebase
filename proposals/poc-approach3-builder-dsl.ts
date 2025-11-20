//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * Proof of Concept: Schema Builder DSL (Approach 3)
 * 
 * This file demonstrates how Approach 3 (Builder DSL) could work in practice.
 * It shows a simplified implementation of a fluent API for creating FHIR Zod schemas.
 */

import { z, type ZodType, type ZodTypeAny } from 'zod'
import type { Patient, DomainResource } from 'fhir/r4b.js'
import { 
  identifierSchema, 
  humanNameSchema, 
  contactPointSchema,
  addressSchema,
  codeableConceptSchema,
  referenceSchema,
  periodSchema,
  booleanSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
} from '../packages/spezi-firebase-fhir/src/elements/index.js'
import { administrativeGenderSchema } from '../packages/spezi-firebase-fhir/src/valueSets/index.js'

// ============================================================================
// BUILDER API: Core Implementation
// ============================================================================

/**
 * Type-safe field configuration
 */
interface FieldConfig {
  array?: boolean
  optional?: boolean
  withPrimitive?: boolean // For FHIR primitive elements like _active, _gender
}

/**
 * Helper to apply field configuration to a schema
 */
function applyFieldConfig<T extends ZodTypeAny>(
  schema: T,
  config: FieldConfig = {}
): ZodTypeAny {
  let result: ZodTypeAny = schema

  if (config.array) {
    result = z.array(result)
  }

  if (config.optional) {
    result = result.optional()
  }

  return result
}

/**
 * Builder for FHIR resource schemas
 */
export class FhirResourceBuilder<T extends DomainResource> {
  private resourceType: string
  private fields: Record<string, ZodTypeAny> = {}

  constructor(resourceType: string) {
    this.resourceType = resourceType
  }

  /**
   * Add a field to the resource
   */
  field<K extends keyof T>(
    name: K,
    schema: ZodTypeAny,
    config: FieldConfig = {}
  ): this {
    this.fields[name as string] = applyFieldConfig(schema, config)

    // Automatically add primitive extension field if requested
    if (config.withPrimitive) {
      this.fields[`_${String(name)}`] = elementSchema.optional()
    }

    return this
  }

  /**
   * Add multiple fields at once
   */
  fields(definitions: Record<string, { schema: ZodTypeAny; config?: FieldConfig }>): this {
    for (const [name, { schema, config }] of Object.entries(definitions)) {
      this.field(name as keyof T, schema, config)
    }
    return this
  }

  /**
   * Add a backbone element (nested structure)
   */
  backbone<K extends keyof T>(
    name: K,
    builder: (bb: BackboneBuilder) => BackboneBuilder,
    config: FieldConfig = {}
  ): this {
    const backboneBuilder = new BackboneBuilder()
    const builtBackbone = builder(backboneBuilder).build()
    this.fields[name as string] = applyFieldConfig(builtBackbone, config)
    return this
  }

  /**
   * Add FHIR choice type (e.g., value[x])
   */
  choiceType(choices: Record<string, { schema: ZodTypeAny; config?: FieldConfig }>): this {
    for (const [name, { schema, config }] of Object.entries(choices)) {
      this.field(name as keyof T, schema, config)
    }
    return this
  }

  /**
   * Build the final Zod schema
   */
  build(): ZodType<T> {
    return z.lazy(() =>
      domainResourceSchema.extend({
        resourceType: z.literal(this.resourceType),
        ...this.fields,
      })
    ) as ZodType<T>
  }
}

/**
 * Builder for backbone elements
 */
export class BackboneBuilder {
  private fields: Record<string, ZodTypeAny> = {}

  field(name: string, schema: ZodTypeAny, config: FieldConfig = {}): this {
    this.fields[name] = applyFieldConfig(schema, config)

    if (config.withPrimitive) {
      this.fields[`_${name}`] = elementSchema.optional()
    }

    return this
  }

  build(): ZodTypeAny {
    return z.object(this.fields)
  }
}

/**
 * Factory function for creating resource builders
 */
export function defineResource<T extends DomainResource>(
  resourceType: string
): FhirResourceBuilder<T> {
  return new FhirResourceBuilder<T>(resourceType)
}

// ============================================================================
// HELPER FUNCTIONS: Simplified Field Definitions
// ============================================================================

/**
 * Helper to create optional array fields (very common in FHIR)
 */
export function optionalArray<T extends ZodTypeAny>(schema: T) {
  return {
    schema,
    config: { array: true, optional: true } as FieldConfig,
  }
}

/**
 * Helper to create optional single fields
 */
export function optional<T extends ZodTypeAny>(schema: T, withPrimitive = false) {
  return {
    schema,
    config: { optional: true, withPrimitive } as FieldConfig,
  }
}

/**
 * Helper to create required array fields
 */
export function array<T extends ZodTypeAny>(schema: T) {
  return {
    schema,
    config: { array: true, optional: false } as FieldConfig,
  }
}

/**
 * Helper to create choice types
 */
export function choice(choices: Record<string, { schema: ZodTypeAny; config?: FieldConfig }>) {
  return choices
}

// ============================================================================
// EXAMPLE: Using the Builder to Define Patient Schema
// ============================================================================

/**
 * Example of defining a Patient resource using the builder DSL
 * 
 * This is much cleaner and more maintainable than manually writing out
 * the entire Zod schema with all its nested structures.
 */
export const patientSchemaBuilderExample = defineResource<Patient>('Patient')
  .field('identifier', identifierSchema, { array: true, optional: true })
  .field('active', booleanSchema, { optional: true, withPrimitive: true })
  .field('name', humanNameSchema, { array: true, optional: true })
  .field('telecom', contactPointSchema, { array: true, optional: true })
  .field('gender', administrativeGenderSchema, { optional: true, withPrimitive: true })
  .field('birthDate', dateSchema, { optional: true, withPrimitive: true })
  .choiceType({
    deceasedBoolean: { schema: booleanSchema, config: { optional: true, withPrimitive: true } },
    deceasedDateTime: { schema: dateTimeSchema, config: { optional: true, withPrimitive: true } },
  })
  .field('address', addressSchema, { array: true, optional: true })
  .field('maritalStatus', codeableConceptSchema, { optional: true })
  .backbone('contact', (bb) =>
    bb
      .field('relationship', codeableConceptSchema, { array: true, optional: true })
      .field('name', humanNameSchema, { optional: true })
      .field('telecom', contactPointSchema, { array: true, optional: true })
      .field('address', addressSchema, { optional: true })
      .field('gender', administrativeGenderSchema, { optional: true })
      .field('organization', referenceSchema, { optional: true })
      .field('period', periodSchema, { optional: true })
  , { array: true, optional: true })
  .backbone('communication', (bb) =>
    bb
      .field('language', codeableConceptSchema, { optional: false })
      .field('preferred', booleanSchema, { optional: true, withPrimitive: true })
  , { array: true, optional: true })
  .field('generalPractitioner', referenceSchema, { array: true, optional: true })
  .field('managingOrganization', referenceSchema, { optional: true })
  .build()

// ============================================================================
// ALTERNATIVE SYNTAX: Using Helper Functions
// ============================================================================

/**
 * Alternative, even more concise syntax using helper functions
 */
export const patientSchemaSimplified = defineResource<Patient>('Patient')
  .fields({
    identifier: optionalArray(identifierSchema),
    active: optional(booleanSchema, true),
    name: optionalArray(humanNameSchema),
    telecom: optionalArray(contactPointSchema),
    gender: optional(administrativeGenderSchema, true),
    birthDate: optional(dateSchema, true),
    address: optionalArray(addressSchema),
    maritalStatus: optional(codeableConceptSchema),
    generalPractitioner: optionalArray(referenceSchema),
    managingOrganization: optional(referenceSchema),
  })
  .choiceType(
    choice({
      deceasedBoolean: optional(booleanSchema, true),
      deceasedDateTime: optional(dateTimeSchema, true),
    })
  )
  .backbone('contact', (bb) =>
    bb
      .field('relationship', codeableConceptSchema, { array: true, optional: true })
      .field('name', humanNameSchema, { optional: true })
      .field('telecom', contactPointSchema, { array: true, optional: true })
      .field('address', addressSchema, { optional: true })
  , { array: true, optional: true })
  .build()

// ============================================================================
// ADVANCED FEATURES: Templates and Presets
// ============================================================================

/**
 * Template for common FHIR patterns
 */
export const FHIR_TEMPLATES = {
  /**
   * Template for resources that commonly use identifiers
   */
  withIdentifiers: (builder: FhirResourceBuilder<any>) =>
    builder.field('identifier', identifierSchema, { array: true, optional: true }),

  /**
   * Template for resources with text descriptions
   */
  withText: (builder: FhirResourceBuilder<any>) =>
    builder.field('text', z.object({
      status: z.enum(['generated', 'extensions', 'additional', 'empty']),
      div: z.string(),
    }), { optional: true }),

  /**
   * Template for clinical resources that reference patients
   */
  withPatientReference: (builder: FhirResourceBuilder<any>) =>
    builder.field('subject', referenceSchema, { optional: true }),
}

/**
 * Example using templates
 * Note: In a real implementation, you would add a pipe() method to the builder class
 */
export function buildObservationWithTemplates() {
  const builder = defineResource('Observation')
  FHIR_TEMPLATES.withIdentifiers(builder)
  FHIR_TEMPLATES.withPatientReference(builder)
  return builder
    .field('status', z.enum(['registered', 'preliminary', 'final', 'amended']), { optional: false })
    .field('code', codeableConceptSchema, { optional: false })
    .build()
}

// ============================================================================
// VALIDATION HELPERS: FHIR-Specific Rules
// ============================================================================

/**
 * Add FHIR-specific validation rules
 */
export class FhirValidationBuilder<T extends DomainResource> {
  constructor(private schema: ZodType<T>) {}

  /**
   * Ensure active patients have identifiers
   */
  requireIdentifiersForActive(): this {
    this.schema = this.schema.refine(
      (data) => {
        if ('active' in data && data.active) {
          return 'identifier' in data && Array.isArray(data.identifier) && data.identifier.length > 0
        }
        return true
      },
      { message: 'Active resources must have at least one identifier' }
    )
    return this
  }

  /**
   * Validate date is not in the future
   */
  dateMustBePast(field: keyof T): this {
    this.schema = this.schema.refine(
      (data) => {
        const date = data[field]
        if (typeof date === 'string') {
          return new Date(date) <= new Date()
        }
        return true
      },
      { message: `${String(field)} cannot be in the future` }
    )
    return this
  }

  build(): ZodType<T> {
    return this.schema
  }
}

/**
 * Example with validation
 */
export const validatedPatientSchema = new FhirValidationBuilder(patientSchemaBuilderExample)
  .requireIdentifiersForActive()
  .dateMustBePast('birthDate')
  .build()

// ============================================================================
// USAGE DEMONSTRATION
// ============================================================================

export function demonstrateBuilderAPI() {
  console.log('=== Builder DSL Demonstration ===\n')

  // Test data
  const validPatient = {
    resourceType: 'Patient' as const,
    id: 'patient-123',
    identifier: [{
      system: 'http://hospital.org/patients',
      value: '12345',
    }],
    active: true,
    name: [{
      use: 'official' as const,
      family: 'Smith',
      given: ['John', 'Michael'],
    }],
    gender: 'male' as const,
    birthDate: '1980-01-15',
  }

  // Validate using builder-created schema
  const result = patientSchemaBuilderExample.safeParse(validPatient)

  if (result.success) {
    console.log('✅ Patient validated successfully')
    console.log('Patient name:', result.data.name?.[0]?.family)
    console.log('Patient gender:', result.data.gender)
  } else {
    console.log('❌ Validation failed:', result.error)
  }

  // Test with validation rules
  const invalidPatient = {
    resourceType: 'Patient' as const,
    active: true,
    // Missing identifier - should fail validation
  }

  const validationResult = validatedPatientSchema.safeParse(invalidPatient)
  if (!validationResult.success) {
    console.log('\n✅ Validation correctly caught missing identifier for active patient')
  }
}

// ============================================================================
// COMPARISON: Before and After
// ============================================================================

/**
 * Before (Manual Zod Schema - Current Approach):
 * 
 * export const patientSchema = z.lazy(() =>
 *   domainResourceSchema.extend({
 *     resourceType: z.literal('Patient').readonly(),
 *     identifier: identifierSchema.array().optional(),
 *     active: booleanSchema.optional(),
 *     _active: elementSchema.optional(),
 *     name: humanNameSchema.array().optional(),
 *     telecom: contactPointSchema.array().optional(),
 *     gender: administrativeGenderSchema.optional(),
 *     _gender: elementSchema.optional(),
 *     birthDate: dateSchema.optional(),
 *     _birthDate: elementSchema.optional(),
 *     // ... many more lines ...
 *     contact: backboneElementSchema
 *       .extend({
 *         relationship: codeableConceptSchema.array().optional(),
 *         name: humanNameSchema.optional(),
 *         telecom: contactPointSchema.array().optional(),
 *         address: addressSchema.optional(),
 *         // ... more nested fields ...
 *       })
 *       .array()
 *       .optional(),
 *   }),
 * )
 * 
 * Lines: ~100+
 * Readability: Medium
 * Maintainability: Difficult (lots of repetitive code)
 * Error-prone: Yes (easy to forget .optional() or .array())
 */

/**
 * After (Builder DSL - Proposed Approach):
 * 
 * export const patientSchema = defineResource<Patient>('Patient')
 *   .fields({
 *     identifier: optionalArray(identifierSchema),
 *     active: optional(booleanSchema, true),
 *     name: optionalArray(humanNameSchema),
 *     telecom: optionalArray(contactPointSchema),
 *     gender: optional(administrativeGenderSchema, true),
 *     birthDate: optional(dateSchema, true),
 *   })
 *   .backbone('contact', (bb) =>
 *     bb
 *       .field('relationship', codeableConceptSchema, { array: true, optional: true })
 *       .field('name', humanNameSchema, { optional: true })
 *   , { array: true, optional: true })
 *   .build()
 * 
 * Lines: ~20-30
 * Readability: High
 * Maintainability: Easy (declarative and concise)
 * Error-prone: No (builder enforces correct patterns)
 */

// ============================================================================
// MIGRATION STRATEGY
// ============================================================================

/**
 * How to migrate existing schemas to use the builder:
 * 
 * 1. Phase 1: Create builder infrastructure (this file)
 * 2. Phase 2: Migrate 5-10 simple resources as proof of concept
 * 3. Phase 3: Create migration guide with before/after examples
 * 4. Phase 4: Gradually migrate remaining resources
 * 5. Phase 5: Deprecate old pattern, encourage builder usage
 * 
 * Benefits:
 * - Can be done incrementally
 * - No breaking changes (old schemas still work)
 * - Team can learn gradually
 * - Immediate productivity benefits
 */

// ============================================================================
// SUMMARY
// ============================================================================

/**
 * Approach 3 (Builder DSL) Summary:
 * 
 * Pros:
 * - 🎯 Balance of automation and control
 * - 📖 Very readable and maintainable
 * - ✅ Excellent type safety
 * - 🔧 Highly customizable
 * - 📦 No external dependencies
 * - 🔄 Incremental migration possible
 * 
 * Cons:
 * - ⏱️ Still requires manual definition per resource
 * - 📚 Learning curve for builder API
 * - 🛠️ Builder library needs maintenance
 * 
 * Best For:
 * - Teams wanting improved developer experience
 * - Gradual migration from current approach
 * - Projects needing flexibility
 * - Long-term maintainability
 */
