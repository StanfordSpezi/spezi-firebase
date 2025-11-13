//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type ResearchStudy,
  type ResearchStudyArm,
  type ResearchStudyObjective,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  contactDetailSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
} from '../elements/index.js'
import { researchStudyStatusSchema } from '../valueSets/index.js'

const researchStudyArmSchema: ZodType<ResearchStudyArm> =
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
  })

const researchStudyObjectiveSchema: ZodType<ResearchStudyObjective> =
  backboneElementSchema.extend({
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
  })

/**
 * Zod schema for FHIR ResearchStudy resource (untyped version).
 */
export const untypedResearchStudySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ResearchStudy').readonly(),
    identifier: identifierSchema.array().optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    protocol: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: researchStudyStatusSchema,
    _status: elementSchema.optional(),
    primaryPurposeType: codeableConceptSchema.optional(),
    phase: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    focus: codeableConceptSchema.array().optional(),
    condition: codeableConceptSchema.array().optional(),
    contact: contactDetailSchema.array().optional(),
    relatedArtifact: relatedArtifactSchema.array().optional(),
    keyword: codeableConceptSchema.array().optional(),
    location: codeableConceptSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    enrollment: referenceSchema.array().optional(),
    period: periodSchema.optional(),
    sponsor: referenceSchema.optional(),
    principalInvestigator: referenceSchema.optional(),
    site: referenceSchema.array().optional(),
    reasonStopped: codeableConceptSchema.optional(),
    note: annotationSchema.array().optional(),
    arm: researchStudyArmSchema.array().optional(),
    objective: researchStudyObjectiveSchema.array().optional(),
  }),
) satisfies ZodType<ResearchStudy>

/**
 * Zod schema for FHIR ResearchStudy resource.
 */
export const researchStudySchema: ZodType<ResearchStudy> =
  untypedResearchStudySchema

/**
 * Wrapper class for FHIR ResearchStudy resources.
 * Provides utility methods for working with research studies and clinical trials.
 */
export class FhirResearchStudy extends FhirDomainResource<ResearchStudy> {
  // Static Functions

  /**
   * Parses a ResearchStudy resource from unknown data.
   *
   * @param value - The data to parse and validate against the ResearchStudy schema
   * @returns A FhirResearchStudy instance containing the validated resource
   */
  public static parse(value: unknown): FhirResearchStudy {
    return new FhirResearchStudy(researchStudySchema.parse(value))
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
