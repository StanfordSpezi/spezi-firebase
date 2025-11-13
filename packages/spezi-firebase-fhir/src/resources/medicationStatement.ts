//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type MedicationStatement } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  codeableConceptSchema,
  dateTimeSchema,
  dosageSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'
import { medicationStatementStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR MedicationStatement resource (untyped version).
 */
export const untypedMedicationStatementSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationStatement').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: medicationStatementStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.array().optional(),
    category: codeableConceptSchema.optional(),
    medicationCodeableConcept: codeableConceptSchema.optional(),
    medicationReference: referenceSchema.optional(),
    subject: referenceSchema,
    context: referenceSchema.optional(),
    effectiveDateTime: dateTimeSchema.optional(),
    _effectiveDateTime: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    dateAsserted: dateTimeSchema.optional(),
    _dateAsserted: elementSchema.optional(),
    informationSource: referenceSchema.optional(),
    derivedFrom: referenceSchema.array().optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    dosage: dosageSchema.array().optional(),
  }),
) satisfies ZodType<MedicationStatement>

/**
 * Zod schema for FHIR MedicationStatement resource.
 */
export const medicationStatementSchema: ZodType<MedicationStatement> =
  untypedMedicationStatementSchema

/**
 * Wrapper class for FHIR MedicationStatement resources.
 * Provides utility methods for working with medication statements.
 */
export class FhirMedicationStatement extends FhirDomainResource<MedicationStatement> {
  // Static Functions

  /**
   * Parses a MedicationStatement resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirMedicationStatement instance
   */
  public static parse(value: unknown): FhirMedicationStatement {
    return new FhirMedicationStatement(medicationStatementSchema.parse(value))
  }

  // Properties

  /**
   * Gets the effective date/time as a JavaScript Date object.
   *
   * @returns The effective date if available
   */
  public get effectiveDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.effectiveDateTime)
  }

  /**
   * Gets the date asserted as a JavaScript Date object.
   *
   * @returns The date asserted if available
   */
  public get dateAsserted(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.dateAsserted)
  }

  /**
   * Gets note texts from the medication statement.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
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
   * @returns Array of identifier values matching any provided type
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
