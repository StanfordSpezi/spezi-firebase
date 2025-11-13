//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type SupplyDelivery,
  type SupplyDeliverySuppliedItem,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  timingSchema,
} from '../elements/index.js'
import { supplyDeliveryStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR SupplyDeliverySuppliedItem backbone element.
 */
const supplyDeliverySuppliedItemSchema: ZodType<SupplyDeliverySuppliedItem> =
  backboneElementSchema.extend({
    quantity: quantitySchema.optional(),
    itemCodeableConcept: codeableConceptSchema.optional(),
    itemReference: referenceSchema.optional(),
  })

/**
 * Untyped Zod schema for FHIR SupplyDelivery resource (for lazy evaluation).
 */
export const untypedSupplyDeliverySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SupplyDelivery').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: supplyDeliveryStatusSchema.optional(),
    _status: elementSchema.optional(),
    patient: referenceSchema.optional(),
    type: codeableConceptSchema.optional(),
    suppliedItem: supplyDeliverySuppliedItemSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    supplier: referenceSchema.optional(),
    destination: referenceSchema.optional(),
    receiver: referenceSchema.array().optional(),
  }),
) satisfies ZodType<SupplyDelivery>

/**
 * Zod schema for FHIR SupplyDelivery resource.
 */
export const supplyDeliverySchema: ZodType<SupplyDelivery> =
  untypedSupplyDeliverySchema

/**
 * Wrapper class for FHIR SupplyDelivery resources.
 * Provides utility methods for working with supply deliveries that record the delivery of supplies.
 */
export class FhirSupplyDelivery extends FhirDomainResource<SupplyDelivery> {
  /**
   * Parses a SupplyDelivery resource from unknown data.
   *
   * @param value - The data to parse and validate against the SupplyDelivery schema
   * @returns A FhirSupplyDelivery instance containing the validated resource
   */
  public static parse(value: unknown): FhirSupplyDelivery {
    return new FhirSupplyDelivery(supplyDeliverySchema.parse(value))
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
   * Get the type of supply delivery as display text.
   *
   * @returns The type display text, or undefined if not set
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
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
