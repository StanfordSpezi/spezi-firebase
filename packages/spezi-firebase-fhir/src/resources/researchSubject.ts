//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type ResearchSubject } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { researchSubjectStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR ResearchSubject resource (untyped version).
 */
export const untypedResearchSubjectSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ResearchSubject').readonly(),
    identifier: identifierSchema.array().optional(),
    status: researchSubjectStatusSchema,
    _status: elementSchema.optional(),
    period: periodSchema.optional(),
    study: referenceSchema,
    individual: referenceSchema,
    assignedArm: stringSchema.optional(),
    _assignedArm: elementSchema.optional(),
    actualArm: stringSchema.optional(),
    _actualArm: elementSchema.optional(),
    consent: referenceSchema.optional(),
  }),
) satisfies ZodType<ResearchSubject>

/**
 * Zod schema for FHIR ResearchSubject resource.
 */
export const researchSubjectSchema: ZodType<ResearchSubject> =
  untypedResearchSubjectSchema

/**
 * Wrapper class for FHIR ResearchSubject resources.
 * Provides utility methods for working with research subjects and study participants.
 */
export class FhirResearchSubject extends FhirDomainResource<ResearchSubject> {
  // Static Functions

  /**
   * Parses a ResearchSubject resource from unknown data.
   *
   * @param value - The data to parse and validate against the ResearchSubject schema
   * @returns A FhirResearchSubject instance containing the validated resource
   */
  public static parse(value: unknown): FhirResearchSubject {
    return new FhirResearchSubject(researchSubjectSchema.parse(value))
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
