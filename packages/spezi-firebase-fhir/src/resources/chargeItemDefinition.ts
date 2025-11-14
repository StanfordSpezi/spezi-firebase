//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ChargeItemDefinitionApplicability,
  type ChargeItemDefinitionPropertyGroup,
  type ChargeItemDefinitionPropertyGroupPriceComponent,
  type ChargeItemDefinition,
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
  booleanSchema,
  dateSchema,
  uriSchema,
  canonicalSchema,
  moneySchema,
  decimalSchema,
  usageContextSchema,
  contactDetailSchema,
} from '../elements/index.js'
import {
  chargeItemDefinitionStatusSchema,
  priceComponentTypeSchema,
} from '../valueSets/index.js'

const chargeItemDefinitionApplicabilitySchema: ZodType<ChargeItemDefinitionApplicability> =
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    language: stringSchema.optional(),
    _language: elementSchema.optional(),
    expression: stringSchema.optional(),
    _expression: elementSchema.optional(),
  })

const chargeItemDefinitionPropertyGroupPriceComponentSchema: ZodType<ChargeItemDefinitionPropertyGroupPriceComponent> =
  backboneElementSchema.extend({
    type: priceComponentTypeSchema,
    _type: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    factor: decimalSchema.optional(),
    amount: moneySchema.optional(),
  })

const chargeItemDefinitionPropertyGroupSchema: ZodType<ChargeItemDefinitionPropertyGroup> =
  backboneElementSchema.extend({
    applicability: chargeItemDefinitionApplicabilitySchema.array().optional(),
    priceComponent: chargeItemDefinitionPropertyGroupPriceComponentSchema
      .array()
      .optional(),
  })

/**
 * Zod schema for FHIR ChargeItemDefinition resource (untyped version).
 */
export const untypedChargeItemDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ChargeItemDefinition').readonly(),
    url: uriSchema,
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    derivedFromUri: uriSchema.array().optional(),
    _derivedFromUri: elementSchema.array().optional(),
    partOf: canonicalSchema.array().optional(),
    _partOf: elementSchema.array().optional(),
    replaces: canonicalSchema.array().optional(),
    _replaces: elementSchema.array().optional(),
    status: chargeItemDefinitionStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    copyright: stringSchema.optional(),
    _copyright: elementSchema.optional(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    code: codeableConceptSchema.optional(),
    instance: referenceSchema.array().optional(),
    applicability: chargeItemDefinitionApplicabilitySchema.array().optional(),
    propertyGroup: chargeItemDefinitionPropertyGroupSchema.array().optional(),
  }),
) satisfies ZodType<ChargeItemDefinition>

/**
 * Zod schema for FHIR ChargeItemDefinition resource.
 */
export const chargeItemDefinitionSchema: ZodType<ChargeItemDefinition> =
  untypedChargeItemDefinitionSchema

/**
 * Wrapper class for FHIR ChargeItemDefinition resources.
 * Provides utility methods for working with charge item definitions and pricing rules.
 */
export class FhirChargeItemDefinition extends FhirDomainResource<ChargeItemDefinition> {
  // Static Functions

  /**
   * Parses a ChargeItemDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the ChargeItemDefinition schema
   * @returns A FhirChargeItemDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirChargeItemDefinition {
    return new FhirChargeItemDefinition(chargeItemDefinitionSchema.parse(value))
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
