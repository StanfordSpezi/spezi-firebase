//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type CoverageEligibilityRequest } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  referenceSchema,
  dateTimeSchema,
  periodSchema,
  dateSchema,
  positiveIntSchema,
  moneySchema,
  stringSchema,
  quantitySchema,
  booleanSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  eligibilityRequestPurposeSchema,
} from '../valueSets/index.js'

/**
 * Zod schema for FHIR CoverageEligibilityRequest resource (untyped version).
 */
export const untypedCoverageEligibilityRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CoverageEligibilityRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    priority: codeableConceptSchema.optional(),
    purpose: eligibilityRequestPurposeSchema.array(),
    _purpose: elementSchema.array().optional(),
    patient: referenceSchema,
    servicedDate: dateSchema.optional(),
    _servicedDate: elementSchema.optional(),
    servicedPeriod: periodSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    enterer: referenceSchema.optional(),
    provider: referenceSchema.optional(),
    insurer: referenceSchema,
    facility: referenceSchema.optional(),
    supportingInfo: backboneElementSchema
      .extend({
        sequence: positiveIntSchema,
        information: referenceSchema,
        appliesToAll: booleanSchema.optional(),
        _appliesToAll: elementSchema.optional(),
      })
      .array()
      .optional(),
    insurance: backboneElementSchema
      .extend({
        focal: z.boolean().optional(),
        _focal: elementSchema.optional(),
        coverage: referenceSchema,
        businessArrangement: stringSchema.optional(),
        _businessArrangement: elementSchema.optional(),
      })
      .array()
      .optional(),
    item: backboneElementSchema
      .extend({
        supportingInfoSequence: positiveIntSchema.array().optional(),
        category: codeableConceptSchema.optional(),
        productOrService: codeableConceptSchema.optional(),
        modifier: codeableConceptSchema.array().optional(),
        provider: referenceSchema.optional(),
        quantity: quantitySchema.optional(),
        unitPrice: moneySchema.optional(),
        facility: referenceSchema.optional(),
        diagnosis: backboneElementSchema
          .extend({
            diagnosisCodeableConcept: codeableConceptSchema.optional(),
            diagnosisReference: referenceSchema.optional(),
          })
          .array()
          .optional(),
        detail: referenceSchema.array().optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<CoverageEligibilityRequest>

/**
 * Zod schema for FHIR CoverageEligibilityRequest resource.
 */
export const coverageEligibilityRequestSchema: ZodType<CoverageEligibilityRequest> =
  untypedCoverageEligibilityRequestSchema

/**
 * Wrapper class for FHIR CoverageEligibilityRequest resources.
 * Provides utility methods for working with insurance coverage eligibility requests.
 */
export class FhirCoverageEligibilityRequest extends FhirDomainResource<CoverageEligibilityRequest> {
  // Static Functions

  /**
   * Parses a CoverageEligibilityRequest resource from unknown data.
   *
   * @param value - The data to parse and validate against the CoverageEligibilityRequest schema
   * @returns A FhirCoverageEligibilityRequest instance containing the validated resource
   */
  public static parse(value: unknown): FhirCoverageEligibilityRequest {
    return new FhirCoverageEligibilityRequest(
      coverageEligibilityRequestSchema.parse(value),
    )
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
