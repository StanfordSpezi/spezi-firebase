//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type EnrollmentRequest } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  elementSchema,
  referenceSchema,
  dateTimeSchema,
} from '../elements/index.js'
import { financialResourceStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR EnrollmentRequest resource (untyped version).
 */
export const untypedEnrollmentRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EnrollmentRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema.optional(),
    _status: elementSchema.optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    insurer: referenceSchema.optional(),
    provider: referenceSchema.optional(),
    candidate: referenceSchema.optional(),
    coverage: referenceSchema.optional(),
  }),
) satisfies ZodType<EnrollmentRequest>

/**
 * Zod schema for FHIR EnrollmentRequest resource.
 */
export const enrollmentRequestSchema: ZodType<EnrollmentRequest> =
  untypedEnrollmentRequestSchema

/**
 * Wrapper class for FHIR EnrollmentRequest resources.
 * Provides utility methods for working with enrollment requests.
 */
export class FhirEnrollmentRequest extends FhirDomainResource<EnrollmentRequest> {
  // Static Functions

  /**
   * Parses an EnrollmentRequest resource from unknown data.
   *
   * @param value - The data to parse and validate against the EnrollmentRequest schema
   * @returns A FhirEnrollmentRequest instance containing the validated resource
   */
  public static parse(value: unknown): FhirEnrollmentRequest {
    return new FhirEnrollmentRequest(enrollmentRequestSchema.parse(value))
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
