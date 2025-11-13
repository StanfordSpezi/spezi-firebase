//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type GuidanceResponse } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  canonicalSchema,
  codeableConceptSchema,
  dataRequirementSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  uriSchema,
} from '../elements/index.js'
import { guidanceResponseStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR GuidanceResponse resource (untyped version).
 */
export const untypedGuidanceResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('GuidanceResponse').readonly(),
    requestIdentifier: identifierSchema.optional(),
    identifier: identifierSchema.array().optional(),
    moduleUri: uriSchema.optional(),
    _moduleUri: elementSchema.optional(),
    moduleCanonical: canonicalSchema.optional(),
    _moduleCanonical: elementSchema.optional(),
    moduleCodeableConcept: codeableConceptSchema.optional(),
    status: guidanceResponseStatusSchema,
    _status: elementSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    performer: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    evaluationMessage: referenceSchema.array().optional(),
    outputParameters: referenceSchema.optional(),
    result: referenceSchema.optional(),
    dataRequirement: dataRequirementSchema.array().optional(),
  }),
) satisfies ZodType<GuidanceResponse>

/**
 * Zod schema for FHIR GuidanceResponse resource.
 */
export const guidanceResponseSchema: ZodType<GuidanceResponse> =
  untypedGuidanceResponseSchema

/**
 * Wrapper class for FHIR GuidanceResponse resources.
 * Provides utility methods for working with guidance responses and decision support outcomes.
 */
export class FhirGuidanceResponse extends FhirDomainResource<GuidanceResponse> {
  // Static Functions

  /**
   * Parses a GuidanceResponse resource from unknown data.
   *
   * @param value - The data to parse and validate against the GuidanceResponse schema
   * @returns A FhirGuidanceResponse instance containing the validated resource
   */
  public static parse(value: unknown): FhirGuidanceResponse {
    return new FhirGuidanceResponse(guidanceResponseSchema.parse(value))
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
