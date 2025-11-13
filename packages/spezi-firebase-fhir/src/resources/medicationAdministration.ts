//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type MedicationAdministrationPerformer,
  type Coding,
  type MedicationAdministration,
  MedicationAdministrationDosage,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { medicationAdministrationStatusSchema } from '../valueSets/index.js'

const medicationAdministrationPerformerSchema: ZodType<MedicationAdministrationPerformer> =
  backboneElementSchema.extend({
    function: codeableConceptSchema.optional(),
    actor: referenceSchema,
  })

const medicationAdministrationDosageSchema: ZodType<MedicationAdministrationDosage> =
  backboneElementSchema.extend({
    text: stringSchema.optional(),
    site: codeableConceptSchema.optional(),
    route: codeableConceptSchema.optional(),
    method: codeableConceptSchema.optional(),
    dose: quantitySchema.optional(),
    rateRatio: ratioSchema.optional(),
    rateQuantity: quantitySchema.optional(),
  })

/**
 * Zod schema for FHIR MedicationAdministration resource (untyped version).
 */
export const untypedMedicationAdministrationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationAdministration').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiates: uriSchema.array().optional(),
    _instantiates: elementSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: medicationAdministrationStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.array().optional(),
    category: codeableConceptSchema.optional(),
    medicationCodeableConcept: codeableConceptSchema.optional(),
    medicationReference: referenceSchema.optional(),
    subject: referenceSchema,
    context: referenceSchema.optional(),
    supportingInformation: referenceSchema.array().optional(),
    effectiveDateTime: dateTimeSchema.optional(),
    _effectiveDateTime: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    performer: medicationAdministrationPerformerSchema.array().optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    request: referenceSchema.optional(),
    device: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    dosage: medicationAdministrationDosageSchema.optional(),
    eventHistory: referenceSchema.array().optional(),
  }),
) satisfies ZodType<MedicationAdministration>

/**
 * Zod schema for FHIR MedicationAdministration resource.
 */
export const medicationAdministrationSchema: ZodType<MedicationAdministration> =
  untypedMedicationAdministrationSchema

/**
 * Wrapper class for FHIR MedicationAdministration resources.
 * Provides utility methods for working with medication administrations.
 */
export class FhirMedicationAdministration extends FhirDomainResource<MedicationAdministration> {
  // Static Functions

  /**
   * Parses a MedicationAdministration resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirMedicationAdministration instance
   */
  public static parse(value: unknown): FhirMedicationAdministration {
    return new FhirMedicationAdministration(
      medicationAdministrationSchema.parse(value),
    )
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
   * Gets the effective period start date.
   *
   * @returns The effective period start date, or undefined if not set
   */
  public get effectivePeriodStartDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.effectivePeriod?.start)
  }

  /**
   * Gets the effective period end date.
   *
   * @returns The effective period end date, or undefined if not set
   */
  public get effectivePeriodEndDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.effectivePeriod?.end)
  }

  /**
   * Gets note texts from the medication administration.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }

  /**
   * Gets all reason code displays.
   *
   * @returns Array of reason display texts
   */
  public get reasonDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.reasonCode)
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
