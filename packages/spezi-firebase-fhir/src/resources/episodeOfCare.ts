//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type EpisodeOfCareDiagnosis,
  type EpisodeOfCareStatusHistory,
  type EpisodeOfCare,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  identifierSchema,
  periodSchema,
  positiveIntSchema,
  referenceSchema,
} from '../elements/index.js'
import { episodeOfCareStatusSchema } from '../valueSets/index.js'

const episodeOfCareStatusHistorySchema: ZodType<EpisodeOfCareStatusHistory> =
  backboneElementSchema.extend({
    status: episodeOfCareStatusSchema,
    period: periodSchema,
  })

const episodeOfCareDiagnosisSchema: ZodType<EpisodeOfCareDiagnosis> =
  backboneElementSchema.extend({
    condition: referenceSchema,
    role: codeableConceptSchema.optional(),
    rank: positiveIntSchema.optional(),
  })

/**
 * Zod schema for FHIR EpisodeOfCare resource (untyped version).
 */
export const untypedEpisodeOfCareSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EpisodeOfCare').readonly(),
    identifier: identifierSchema.array().optional(),
    status: episodeOfCareStatusSchema,
    statusHistory: episodeOfCareStatusHistorySchema.array().optional(),
    type: codeableConceptSchema.array().optional(),
    diagnosis: episodeOfCareDiagnosisSchema.array().optional(),
    patient: referenceSchema,
    managingOrganization: referenceSchema.optional(),
    period: periodSchema.optional(),
    referralRequest: referenceSchema.array().optional(),
    careManager: referenceSchema.optional(),
    team: referenceSchema.array().optional(),
    account: referenceSchema.array().optional(),
  }),
) satisfies ZodType<EpisodeOfCare>

/**
 * Zod schema for FHIR EpisodeOfCare resource.
 */
export const episodeOfCareSchema: ZodType<EpisodeOfCare> =
  untypedEpisodeOfCareSchema

/**
 * Wrapper class for FHIR EpisodeOfCare resources.
 * Provides utility methods for working with episodes of care and their periods.
 */
export class FhirEpisodeOfCare extends FhirDomainResource<EpisodeOfCare> {
  /**
   * Parses an EpisodeOfCare resource from unknown data.
   *
   * @param value - The data to parse and validate against the EpisodeOfCare schema
   * @returns A FhirEpisodeOfCare instance containing the validated resource
   */
  public static parse(value: unknown): FhirEpisodeOfCare {
    return new FhirEpisodeOfCare(episodeOfCareSchema.parse(value))
  }

  /**
   * Gets the episode period start date.
   *
   * @returns The start date if available, undefined otherwise
   */
  public get periodStart(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.period?.start)
  }

  /**
   * Gets the episode period end date.
   *
   * @returns The end date if available, undefined otherwise
   */
  public get periodEnd(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.period?.end)
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
