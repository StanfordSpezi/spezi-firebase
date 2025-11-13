//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type CoverageEligibilityResponse } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  referenceSchema,
  stringSchema,
  dateTimeSchema,
  periodSchema,
  dateSchema,
  moneySchema,
  booleanSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  remittanceOutcomeSchema,
  eligibilityResponsePurposeSchema,
} from '../valueSets/index.js'

/**
 * Zod schema for FHIR CoverageEligibilityResponse resource (untyped version).
 */
export const untypedCoverageEligibilityResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CoverageEligibilityResponse').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema,
    _status: elementSchema.optional(),
    purpose: eligibilityResponsePurposeSchema.array(),
    _purpose: elementSchema.array().optional(),
    patient: referenceSchema,
    servicedDate: dateSchema.optional(),
    _servicedDate: elementSchema.optional(),
    servicedPeriod: periodSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    requestor: referenceSchema.optional(),
    request: referenceSchema,
    outcome: remittanceOutcomeSchema,
    _outcome: elementSchema.optional(),
    disposition: stringSchema.optional(),
    _disposition: elementSchema.optional(),
    insurer: referenceSchema,
    insurance: backboneElementSchema
      .extend({
        coverage: referenceSchema,
        inforce: booleanSchema.optional(),
        _inforce: elementSchema.optional(),
        benefitPeriod: periodSchema.optional(),
        item: backboneElementSchema
          .extend({
            category: codeableConceptSchema.optional(),
            productOrService: codeableConceptSchema.optional(),
            modifier: codeableConceptSchema.array().optional(),
            provider: referenceSchema.optional(),
            excluded: booleanSchema.optional(),
            _excluded: elementSchema.optional(),
            name: stringSchema.optional(),
            _name: elementSchema.optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            network: codeableConceptSchema.optional(),
            unit: codeableConceptSchema.optional(),
            term: codeableConceptSchema.optional(),
            benefit: backboneElementSchema
              .extend({
                type: codeableConceptSchema,
                allowedUnsignedInt: z.number().optional(),
                allowedString: stringSchema.optional(),
                _allowedString: elementSchema.optional(),
                allowedMoney: moneySchema.optional(),
                usedUnsignedInt: z.number().optional(),
                usedString: stringSchema.optional(),
                _usedString: elementSchema.optional(),
                usedMoney: moneySchema.optional(),
              })
              .array()
              .optional(),
            authorizationRequired: booleanSchema.optional(),
            _authorizationRequired: elementSchema.optional(),
            authorizationSupporting: codeableConceptSchema.array().optional(),
            authorizationUrl: z.string().optional(),
            _authorizationUrl: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    preAuthRef: stringSchema.optional(),
    _preAuthRef: elementSchema.optional(),
    form: codeableConceptSchema.optional(),
    error: backboneElementSchema
      .extend({
        code: codeableConceptSchema,
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<CoverageEligibilityResponse>

/**
 * Zod schema for FHIR CoverageEligibilityResponse resource.
 */
export const coverageEligibilityResponseSchema: ZodType<CoverageEligibilityResponse> =
  untypedCoverageEligibilityResponseSchema

/**
 * Wrapper class for FHIR CoverageEligibilityResponse resources.
 * Provides utility methods for working with insurance coverage eligibility responses.
 */
export class FhirCoverageEligibilityResponse extends FhirDomainResource<CoverageEligibilityResponse> {
  // Static Functions

  /**
   * Parses a CoverageEligibilityResponse resource from unknown data.
   *
   * @param value - The data to parse and validate against the CoverageEligibilityResponse schema
   * @returns A FhirCoverageEligibilityResponse instance containing the validated resource
   */
  public static parse(value: unknown): FhirCoverageEligibilityResponse {
    return new FhirCoverageEligibilityResponse(
      coverageEligibilityResponseSchema.parse(value),
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
