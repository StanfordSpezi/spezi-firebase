//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type ServiceRequest } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  booleanSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
  timingSchema,
} from '../elements/index.js'
import {
  requestPrioritySchema,
  serviceRequestIntentSchema,
  serviceRequestStatusSchema,
} from '../valueSets/index.js'

/**
 * Zod schema for FHIR ServiceRequest resource (untyped version).
 */
export const untypedServiceRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ServiceRequest').readonly(),
    asNeededBoolean: booleanSchema.optional(),
    _asNeededBoolean: elementSchema.optional(),
    asNeededCodeableConcept: codeableConceptSchema.optional(),
    authoredOn: stringSchema.optional(),
    _authoredOn: elementSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    bodySite: codeableConceptSchema.array().optional(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    doNotPerform: booleanSchema.optional(),
    _doNotPerform: elementSchema.optional(),
    encounter: referenceSchema.optional(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: stringSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: stringSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    insurance: referenceSchema.array().optional(),
    intent: serviceRequestIntentSchema,
    _intent: elementSchema.optional(),
    locationCode: codeableConceptSchema.array().optional(),
    locationReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    occurrenceDateTime: stringSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    orderDetail: codeableConceptSchema.array().optional(),
    patientInstruction: stringSchema.optional(),
    _patientInstruction: elementSchema.optional(),
    performer: referenceSchema.array().optional(),
    performerType: codeableConceptSchema.optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    quantityQuantity: quantitySchema.optional(),
    quantityRatio: ratioSchema.optional(),
    quantityRange: rangeSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    relevantHistory: referenceSchema.array().optional(),
    replaces: referenceSchema.array().optional(),
    requester: referenceSchema.optional(),
    requisition: identifierSchema.optional(),
    specimen: referenceSchema.array().optional(),
    status: serviceRequestStatusSchema,
    _status: elementSchema.optional(),
    subject: referenceSchema,
    supportingInfo: referenceSchema.array().optional(),
  }),
) satisfies ZodType<ServiceRequest>

/**
 * Zod schema for FHIR ServiceRequest resource.
 */
export const serviceRequestSchema: ZodType<ServiceRequest> =
  untypedServiceRequestSchema

/**
 * Wrapper class for FHIR ServiceRequest resources.
 * Provides utility methods for working with service requests.
 */
export class FhirServiceRequest extends FhirDomainResource<ServiceRequest> {
  // Static Functions

  /**
   * Parses a ServiceRequest resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirServiceRequest instance
   */
  public static parse(value: unknown): FhirServiceRequest {
    return new FhirServiceRequest(serviceRequestSchema.parse(value))
  }

  // Properties

  /**
   * Gets the authored date as a JavaScript Date object.
   *
   * @returns The authored date if available
   */
  public get authoredDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.authoredOn)
  }

  /**
   * Gets the occurrence date as a JavaScript Date object.
   *
   * @returns The occurrence date if available
   */
  public get occurrenceDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.occurrenceDateTime)
  }

  /**
   * Gets the code display text (what is being requested).
   *
   * @returns The code display
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Gets all category displays.
   *
   * @returns Array of category display texts
   */
  public getCategoryDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.category)
  }

  /**
   * Gets note texts from the service request.
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
