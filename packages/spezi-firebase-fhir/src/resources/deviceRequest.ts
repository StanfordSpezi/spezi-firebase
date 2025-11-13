//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type DeviceRequestParameter,
  type DeviceRequest,
  type Coding,
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
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
  timingSchema,
} from '../elements/index.js'
import {
  deviceRequestIntentSchema,
  deviceRequestStatusSchema,
  requestPrioritySchema,
} from '../valueSets/index.js'

const deviceRequestParameterSchema: ZodType<DeviceRequestParameter> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueRange: rangeSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR DeviceRequest resource (untyped version).
 */
export const untypedDeviceRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: stringSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: stringSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    priorRequest: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    status: deviceRequestStatusSchema.optional(),
    _status: elementSchema.optional(),
    intent: deviceRequestIntentSchema,
    _intent: elementSchema.optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    codeReference: referenceSchema.optional(),
    codeCodeableConcept: codeableConceptSchema.optional(),
    parameter: deviceRequestParameterSchema.array().optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    requester: referenceSchema.optional(),
    performerType: codeableConceptSchema.optional(),
    performer: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    insurance: referenceSchema.array().optional(),
    supportingInfo: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    relevantHistory: referenceSchema.array().optional(),
  }),
) satisfies ZodType<DeviceRequest>

/**
 * Zod schema for FHIR DeviceRequest resource.
 */
export const deviceRequestSchema: ZodType<DeviceRequest> =
  untypedDeviceRequestSchema

/**
 * Wrapper class for FHIR DeviceRequest resources.
 * Provides utility methods for working with device requests and orders.
 */
export class FhirDeviceRequest extends FhirDomainResource<DeviceRequest> {
  // Static Functions

  /**
   * Parses a DeviceRequest resource from unknown data.
   *
   * @param value - The data to parse and validate against the DeviceRequest schema
   * @returns A FhirDeviceRequest instance containing the validated resource
   */
  public static parse(value: unknown): FhirDeviceRequest {
    return new FhirDeviceRequest(deviceRequestSchema.parse(value))
  }

  /**
   * Get the authored date as a Date object.
   * @returns The authored date, or undefined if not set
   */
  public get authoredDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.authoredOn)
  }

  /**
   * Get the occurrence date/time if specified as a dateTime.
   * @returns The occurrence date, or undefined if not set or not a dateTime
   */
  public get occurrenceDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.occurrenceDateTime)
  }

  /**
   * Get the occurrence period start date.
   * @returns The start date, or undefined if not set
   */
  public get occurrencePeriodStart(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.occurrencePeriod?.start)
  }

  /**
   * Get the occurrence period end date.
   * @returns The end date, or undefined if not set
   */
  public get occurrencePeriodEnd(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.occurrencePeriod?.end)
  }

  /**
   * Get device code display text.
   * @returns Device code display text
   */
  public get deviceCodeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(
      this.value.codeCodeableConcept,
    )
  }

  /**
   * Get note texts from the device request.
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }

  /**
   * Get reason displays from reason codes.
   * @returns Array of reason display texts
   */
  public get reasonDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.reasonCode)
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
