//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type MedicationRequest } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  canonicalSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  dosageSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  unsignedIntSchema,
  uriSchema,
} from '../elements/index.js'
import {
  medicationRequestIntentSchema,
  medicationRequestStatusSchema,
  requestPrioritySchema,
} from '../valueSets/index.js'

/**
 * Zod schema for FHIR MedicationRequest resource (untyped version).
 */
export const untypedMedicationRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationRequest'),
    identifier: identifierSchema.array().optional(),
    status: medicationRequestStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    intent: medicationRequestIntentSchema,
    category: codeableConceptSchema.array().optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    doNotPerform: booleanSchema.optional(),
    _doNotPerform: elementSchema.optional(),
    medicationCodeableConcept: codeableConceptSchema.optional(),
    medicationReference: referenceSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    supportingInformation: referenceSchema.array().optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    requester: referenceSchema.optional(),
    performer: referenceSchema.optional(),
    performerType: codeableConceptSchema.optional(),
    recorder: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    courseOfTherapyType: codeableConceptSchema.optional(),
    insurance: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    dosageInstruction: dosageSchema.array().optional(),
    dispenseRequest: backboneElementSchema
      .extend({
        initialFill: backboneElementSchema
          .extend({
            quantity: quantitySchema.optional(),
            duration: quantitySchema.optional(),
          })
          .optional(),
        dispenseInterval: quantitySchema.optional(),
        validityPeriod: periodSchema.optional(),
        numberOfRepeatsAllowed: unsignedIntSchema.optional(),
        quantity: quantitySchema.optional(),
        expectedSupplyDuration: quantitySchema.optional(),
        performer: referenceSchema.optional(),
      })
      .optional(),
    substitution: backboneElementSchema
      .extend({
        allowedBoolean: booleanSchema.optional(),
        _allowedBoolean: elementSchema.optional(),
        allowedCodeableConcept: codeableConceptSchema.optional(),
      })
      .optional(),
    priorPrescription: referenceSchema.optional(),
    detectedIssue: referenceSchema.array().optional(),
    eventHistory: referenceSchema.array().optional(),
  }),
) satisfies ZodType<MedicationRequest>

/**
 * Zod schema for FHIR MedicationRequest resource.
 */
export const medicationRequestSchema: ZodType<MedicationRequest> =
  untypedMedicationRequestSchema

/**
 * Wrapper class for FHIR MedicationRequest resources.
 * Provides utility methods for working with medication orders.
 */
export class FhirMedicationRequest extends FhirDomainResource<MedicationRequest> {
  // Static Functions

  /**
   * Parses a MedicationRequest resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirMedicationRequest instance
   */
  public static parse(value: unknown): FhirMedicationRequest {
    return new FhirMedicationRequest(medicationRequestSchema.parse(value))
  }

  // Properties

  /**
   * Gets the authored date as a JavaScript Date object.
   *
   * @returns The authored date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const authoredDate = medicationRequest.authoredDate
   * ```
   */
  public get authoredDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.authoredOn)
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
