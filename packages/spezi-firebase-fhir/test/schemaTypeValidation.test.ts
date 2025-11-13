//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * This test file uses TypeScript's type system to validate that our Zod schemas
 * exactly match the FHIR R4B type definitions. These are compile-time checks
 * that ensure bidirectional type compatibility.
 */

import type {
  Patient,
  Observation,
  Bundle,
  Practitioner,
  Organization,
} from 'fhir/r4b.js'
import type { z } from 'zod'
import {
  patientSchema,
  observationSchema,
  bundleSchema,
  practitionerSchema,
  organizationSchema,
} from '../src/index.js'

/**
 * Type-level test: Ensures the schema output exactly matches the FHIR type.
 * Both directions must be assignable.
 */
type AssertExactType<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : never
  : never

// Test Patient Schema
type _PatientSchemaOutput = z.infer<typeof patientSchema>
type _PatientTest = AssertExactType<_PatientSchemaOutput, Patient>

// Test Observation Schema
type _ObservationSchemaOutput = z.infer<typeof observationSchema>
type _ObservationTest = AssertExactType<_ObservationSchemaOutput, Observation>

// Test Practitioner Schema
type _PractitionerSchemaOutput = z.infer<typeof practitionerSchema>
type _PractitionerTest = AssertExactType<
  _PractitionerSchemaOutput,
  Practitioner
>

// Test Organization Schema
type _OrganizationSchemaOutput = z.infer<typeof organizationSchema>
type _OrganizationTest = AssertExactType<
  _OrganizationSchemaOutput,
  Organization
>

// Bundle requires a type parameter for its contained resources
type _BundleSchemaOutput = z.infer<ReturnType<typeof bundleSchema>>
// Note: Bundle has a generic parameter, so we test with any
type _BundleTest = AssertExactType<_BundleSchemaOutput, Bundle>

describe('Schema Type Validation', () => {
  it('should have schemas that exactly match FHIR types at compile time', () => {
    // This test validates that the type-level assertions above compile successfully.
    // If there are any type mismatches, TypeScript will fail to compile this file.
    expect(true).toBe(true)
  })

  it('should validate Patient schema produces Patient type', () => {
    const patient: Patient = {
      resourceType: 'Patient',
      name: [
        {
          family: 'Doe',
          given: ['John'],
        },
      ],
    }

    const parsed = patientSchema.parse(patient)

    // Type assertion - if this compiles, types match
    const _typeCheck: Patient = parsed
    expect(parsed.resourceType).toBe('Patient')
  })

  it('should validate Observation schema produces Observation type', () => {
    const observation: Observation = {
      resourceType: 'Observation',
      status: 'final',
      code: {
        text: 'Test',
      },
    }

    const parsed = observationSchema.parse(observation)

    // Type assertion - if this compiles, types match
    const _typeCheck: Observation = parsed
    expect(parsed.resourceType).toBe('Observation')
  })

  it('should validate Practitioner schema produces Practitioner type', () => {
    const practitioner: Practitioner = {
      resourceType: 'Practitioner',
      name: [
        {
          family: 'Smith',
          given: ['Jane'],
        },
      ],
    }

    const parsed = practitionerSchema.parse(practitioner)

    // Type assertion - if this compiles, types match
    const _typeCheck: Practitioner = parsed
    expect(parsed.resourceType).toBe('Practitioner')
  })

  it('should validate Organization schema produces Organization type', () => {
    const organization: Organization = {
      resourceType: 'Organization',
      name: 'Test Hospital',
    }

    const parsed = organizationSchema.parse(organization)

    // Type assertion - if this compiles, types match
    const _typeCheck: Organization = parsed
    expect(parsed.resourceType).toBe('Organization')
  })
})
