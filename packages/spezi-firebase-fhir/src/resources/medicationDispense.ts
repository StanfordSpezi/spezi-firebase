//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type MedicationDispensePerformer,
  type MedicationDispenseSubstitution,
  type Coding,
  type MedicationDispense,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  dosageSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
} from '../elements/index.js'
import { medicationDispenseStatusSchema } from '../valueSets/index.js'

const medicationDispensePerformerSchema: ZodType<MedicationDispensePerformer> =
  backboneElementSchema.extend({
    function: codeableConceptSchema.optional(),
    actor: referenceSchema,
  })

const medicationDispenseSubstitutionSchema: ZodType<MedicationDispenseSubstitution> =
  backboneElementSchema.extend({
    wasSubstituted: booleanSchema,
    _wasSubstituted: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    reason: codeableConceptSchema.array().optional(),
    responsibleParty: referenceSchema.array().optional(),
  })

/**
 * Zod schema for FHIR MedicationDispense resource (untyped version).
 */
export const untypedMedicationDispenseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationDispense').readonly(),
    identifier: identifierSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: medicationDispenseStatusSchema,
    _status: elementSchema.optional(),
    statusReasonCodeableConcept: codeableConceptSchema.optional(),
    statusReasonReference: referenceSchema.optional(),
    category: codeableConceptSchema.optional(),
    medicationCodeableConcept: codeableConceptSchema.optional(),
    medicationReference: referenceSchema.optional(),
    subject: referenceSchema.optional(),
    context: referenceSchema.optional(),
    supportingInformation: referenceSchema.array().optional(),
    performer: medicationDispensePerformerSchema.array().optional(),
    location: referenceSchema.optional(),
    authorizingPrescription: referenceSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    quantity: quantitySchema.optional(),
    daysSupply: quantitySchema.optional(),
    whenPrepared: dateTimeSchema.optional(),
    _whenPrepared: elementSchema.optional(),
    whenHandedOver: dateTimeSchema.optional(),
    _whenHandedOver: elementSchema.optional(),
    destination: referenceSchema.optional(),
    receiver: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    dosageInstruction: dosageSchema.array().optional(),
    substitution: medicationDispenseSubstitutionSchema.optional(),
    detectedIssue: referenceSchema.array().optional(),
    eventHistory: referenceSchema.array().optional(),
  }),
) satisfies ZodType<MedicationDispense>

/**
 * Zod schema for FHIR MedicationDispense resource.
 */
export const medicationDispenseSchema: ZodType<MedicationDispense> =
  untypedMedicationDispenseSchema

/**
 * Wrapper class for FHIR MedicationDispense resources.
 * Provides utility methods for working with medication dispensing information.
 */
export class FhirMedicationDispense extends FhirDomainResource<MedicationDispense> {
  // Static Functions

  /**
   * Parses a MedicationDispense resource from unknown data.
   *
   * @param value - The data to parse and validate against the MedicationDispense schema
   * @returns A FhirMedicationDispense instance containing the validated resource
   */
  public static parse(value: unknown): FhirMedicationDispense {
    return new FhirMedicationDispense(medicationDispenseSchema.parse(value))
  }

  /**
   * Gets the date when the medication was prepared as a JavaScript Date object.
   *
   * @returns The preparation date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const preparedDate = dispense.whenPreparedDate
   * console.log(`Prepared on: ${preparedDate?.toLocaleDateString()}`)
   * ```
   */
  public get whenPreparedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.whenPrepared)
  }

  /**
   * Gets the date when the medication was handed over as a JavaScript Date object.
   *
   * @returns The handover date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const handedOverDate = dispense.whenHandedOverDate
   * console.log(`Handed over on: ${handedOverDate?.toLocaleDateString()}`)
   * ```
   */
  public get whenHandedOverDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.whenHandedOver)
  }

  /**
   * Gets the medication display text from either CodeableConcept or Reference.
   *
   * @returns Display text for the medication, or undefined if not available
   *
   * @example
   * ```typescript
   * const medication = dispense.medicationDisplay
   * console.log(`Dispensed medication: ${medication}`)
   * ```
   */
  public get medicationDisplay(): string | undefined {
    if (this.value.medicationCodeableConcept) {
      return FhirDomainResource.codeableConceptDisplay(
        this.value.medicationCodeableConcept,
      )
    }
    if (this.value.medicationReference) {
      return this.value.medicationReference.display
    }
    return undefined
  }

  /**
   * Gets the note texts as an array of strings.
   *
   * @returns Array of note texts
   *
   * @example
   * ```typescript
   * const notes = dispense.noteTexts
   * notes.forEach(note => console.log(note))
   * ```
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
