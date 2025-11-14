//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type MedicationBatch,
  type MedicationIngredient,
  type Coding,
  type Medication,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { medicationStatusSchema } from '../valueSets/index.js'

const medicationIngredientSchema: ZodType<MedicationIngredient> =
  backboneElementSchema.extend({
    itemCodeableConcept: codeableConceptSchema.optional(),
    itemReference: referenceSchema.optional(),
    isActive: booleanSchema.optional(),
    _isActive: elementSchema.optional(),
    strength: ratioSchema.optional(),
  })

const medicationBatchSchema: ZodType<MedicationBatch> = elementSchema.extend({
  lotNumber: stringSchema.optional(),
  _lotNumber: elementSchema.optional(),
  expirationDate: dateTimeSchema.optional(),
  _expirationDate: elementSchema.optional(),
})

/**
 * Zod schema for FHIR Medication resource (untyped version).
 */
export const untypedMedicationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Medication').readonly(),
    identifier: identifierSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    status: medicationStatusSchema.optional(),
    _status: elementSchema.optional(),
    manufacturer: referenceSchema.optional(),
    form: codeableConceptSchema.optional(),
    amount: quantitySchema.optional(),
    ingredient: medicationIngredientSchema.array().optional(),
    batch: medicationBatchSchema.optional(),
  }),
) satisfies ZodType<Medication>

/**
 * Zod schema for FHIR Medication resource.
 */
export const medicationSchema: ZodType<Medication> = untypedMedicationSchema

/**
 * Wrapper class for FHIR Medication resources.
 * Provides utility methods for working with medications.
 */
export class FhirMedication extends FhirDomainResource<Medication> {
  // Static Functions

  /**
   * Parses a Medication resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirMedication instance
   */
  public static parse(value: unknown): FhirMedication {
    return new FhirMedication(medicationSchema.parse(value))
  }

  // Properties

  /**
   * Gets the medication code display text.
   *
   * @returns The code display
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Gets the medication form display text.
   *
   * @returns The form display
   */
  public get formDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.form)
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided Coding
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
