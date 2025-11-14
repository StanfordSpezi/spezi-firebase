//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type EnrollmentResponse } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  elementSchema,
  referenceSchema,
  stringSchema,
  dateTimeSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  remittanceOutcomeSchema,
} from '../valueSets/index.js'

/**
 * Zod schema for FHIR EnrollmentResponse resource (untyped version).
 */
export const untypedEnrollmentResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EnrollmentResponse').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema.optional(),
    _status: elementSchema.optional(),
    request: referenceSchema.optional(),
    outcome: remittanceOutcomeSchema.optional(),
    _outcome: elementSchema.optional(),
    disposition: stringSchema.optional(),
    _disposition: elementSchema.optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    organization: referenceSchema.optional(),
    requestProvider: referenceSchema.optional(),
  }),
) satisfies ZodType<EnrollmentResponse>

/**
 * Zod schema for FHIR EnrollmentResponse resource.
 */
export const enrollmentResponseSchema: ZodType<EnrollmentResponse> =
  untypedEnrollmentResponseSchema

/**
 * Wrapper class for FHIR EnrollmentResponse resources.
 * Provides utility methods for working with enrollment responses.
 */
export class FhirEnrollmentResponse extends FhirDomainResource<EnrollmentResponse> {
  // Static Functions

  /**
   * Parses an EnrollmentResponse resource from unknown data.
   *
   * @param value - The data to parse and validate against the EnrollmentResponse schema
   * @returns A FhirEnrollmentResponse instance containing the validated resource
   */
  public static parse(value: unknown): FhirEnrollmentResponse {
    return new FhirEnrollmentResponse(enrollmentResponseSchema.parse(value))
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
