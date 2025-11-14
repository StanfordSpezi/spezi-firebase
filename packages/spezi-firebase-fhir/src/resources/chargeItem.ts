//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ChargeItemPerformer,
  type ChargeItem,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
  quantitySchema,
  moneySchema,
  annotationSchema,
  timingSchema,
  decimalSchema,
  dateTimeSchema,
  canonicalSchema,
  uriSchema,
} from '../elements/index.js'
import { chargeItemStatusSchema } from '../valueSets/index.js'

const chargeItemPerformerSchema: ZodType<ChargeItemPerformer> =
  backboneElementSchema.extend({
    function: codeableConceptSchema.optional(),
    actor: referenceSchema,
  })

/**
 * Zod schema for FHIR ChargeItem resource (untyped version).
 */
export const untypedChargeItemSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ChargeItem').readonly(),
    identifier: identifierSchema.array().optional(),
    definitionUri: uriSchema.array().optional(),
    _definitionUri: elementSchema.array().optional(),
    definitionCanonical: canonicalSchema.array().optional(),
    _definitionCanonical: elementSchema.array().optional(),
    status: chargeItemStatusSchema,
    _status: elementSchema.optional(),
    partOf: referenceSchema.array().optional(),
    code: codeableConceptSchema,
    subject: referenceSchema,
    context: referenceSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    performer: chargeItemPerformerSchema.array().optional(),
    performingOrganization: referenceSchema.optional(),
    requestingOrganization: referenceSchema.optional(),
    costCenter: referenceSchema.optional(),
    quantity: quantitySchema.optional(),
    bodysite: codeableConceptSchema.array().optional(),
    factorOverride: decimalSchema.optional(),
    priceOverride: moneySchema.optional(),
    overrideReason: stringSchema.optional(),
    _overrideReason: elementSchema.optional(),
    enterer: referenceSchema.optional(),
    enteredDate: dateTimeSchema.optional(),
    _enteredDate: elementSchema.optional(),
    reason: codeableConceptSchema.array().optional(),
    service: referenceSchema.array().optional(),
    productReference: referenceSchema.optional(),
    productCodeableConcept: codeableConceptSchema.optional(),
    account: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    supportingInformation: referenceSchema.array().optional(),
  }),
) satisfies ZodType<ChargeItem>

/**
 * Zod schema for FHIR ChargeItem resource.
 */
export const chargeItemSchema: ZodType<ChargeItem> = untypedChargeItemSchema

/**
 * Wrapper class for FHIR ChargeItem resources.
 * Provides utility methods for working with billing/charge items.
 */
export class FhirChargeItem extends FhirDomainResource<ChargeItem> {
  // Static Functions

  /**
   * Parses a ChargeItem resource from unknown data.
   *
   * @param value - The data to parse and validate against the ChargeItem schema
   * @returns A FhirChargeItem instance containing the validated resource
   */
  public static parse(value: unknown): FhirChargeItem {
    return new FhirChargeItem(chargeItemSchema.parse(value))
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
