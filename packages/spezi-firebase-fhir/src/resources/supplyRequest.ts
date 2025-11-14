//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type SupplyRequest,
  type SupplyRequestParameter,
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
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  timingSchema,
} from '../elements/index.js'
import {
  requestPrioritySchema,
  supplyRequestStatusSchema,
} from '../valueSets/index.js'

const supplyRequestParameterSchema: ZodType<SupplyRequestParameter> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueRange: rangeSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _value: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR SupplyRequest resource (untyped version).
 */
export const untypedSupplyRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SupplyRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    status: supplyRequestStatusSchema.optional(),
    _status: elementSchema.optional(),
    category: codeableConceptSchema.optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    itemCodeableConcept: codeableConceptSchema.optional(),
    itemReference: referenceSchema.optional(),
    quantity: quantitySchema,
    parameter: supplyRequestParameterSchema.array().optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    requester: referenceSchema.optional(),
    supplier: referenceSchema.array().optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    deliverFrom: referenceSchema.optional(),
    deliverTo: referenceSchema.optional(),
  }),
) satisfies ZodType<SupplyRequest>

/**
 * Zod schema for FHIR SupplyRequest resource.
 */
export const supplyRequestSchema: ZodType<SupplyRequest> =
  untypedSupplyRequestSchema

/**
 * Wrapper class for FHIR SupplyRequest resources.
 * Provides utility methods for working with supply requests that record requests for supplies to be ordered or delivered.
 */
export class FhirSupplyRequest extends FhirDomainResource<SupplyRequest> {
  /**
   * Parses a SupplyRequest resource from unknown data.
   *
   * @param value - The data to parse and validate against the SupplyRequest schema
   * @returns A FhirSupplyRequest instance containing the validated resource
   */
  public static parse(value: unknown): FhirSupplyRequest {
    return new FhirSupplyRequest(supplyRequestSchema.parse(value))
  }

  /**
   * Get the date the request was authored.
   *
   * @returns The authored date, or undefined if not set
   */
  public get authoredDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.authoredOn)
  }

  /**
   * Get the occurrence date/time.
   *
   * @returns The occurrence date/time, or undefined if not set
   */
  public get occurrenceDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.occurrenceDateTime)
  }

  /**
   * Retrieves all identifier values matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns Array of identifier values from matching systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves the first identifier value matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves all identifier values matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns Array of identifier values from matching types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Retrieves the first identifier value matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
