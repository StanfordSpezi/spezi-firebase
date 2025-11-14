//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type CareTeam,
  type CareTeamParticipant,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { careTeamStatusSchema } from '../valueSets/index.js'

const careTeamParticipantSchema: ZodType<CareTeamParticipant> =
  backboneElementSchema.extend({
    role: codeableConceptSchema.array().optional(),
    member: referenceSchema.optional(),
    onBehalfOf: referenceSchema.optional(),
    period: periodSchema.optional(),
  })

/**
 * Zod schema for FHIR CareTeam resource (untyped version).
 */
export const untypedCareTeamSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CareTeam').readonly(),
    identifier: identifierSchema.array().optional(),
    status: careTeamStatusSchema.optional(),
    _status: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    period: periodSchema.optional(),
    participant: careTeamParticipantSchema.array().optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    managingOrganization: referenceSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<CareTeam>

/**
 * Zod schema for FHIR CareTeam resource.
 */
export const careTeamSchema: ZodType<CareTeam> = untypedCareTeamSchema

/**
 * Wrapper class for FHIR CareTeam resources.
 * Provides utility methods for working with care team information.
 */
export class FhirCareTeam extends FhirDomainResource<CareTeam> {
  /**
   * Parses a CareTeam resource from unknown data.
   *
   * @param value - The data to parse and validate against the CareTeam schema
   * @returns A FhirCareTeam instance containing the validated resource
   */
  public static parse(value: unknown): FhirCareTeam {
    return new FhirCareTeam(careTeamSchema.parse(value))
  }

  /**
   * Gets the care team period start date as a JavaScript Date object.
   *
   * @returns The period start date, if available
   */
  public get periodStart(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.period?.start)
  }

  /**
   * Gets the care team period end date as a JavaScript Date object.
   *
   * @returns The period end date, if available
   */
  public get periodEnd(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.period?.end)
  }

  /**
   * Gets human-readable display strings for all category CodeableConcepts.
   *
   * @returns Array of category display texts
   */
  public get categoryDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.category)
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided Coding
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
