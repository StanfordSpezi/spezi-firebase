//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Flag } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'
import { flagStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR Flag resource (untyped version).
 */
export const untypedFlagSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Flag').readonly(),
    identifier: identifierSchema.array().optional(),
    status: flagStatusSchema,
    _status: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema,
    subject: referenceSchema,
    period: periodSchema.optional(),
    encounter: referenceSchema.optional(),
    author: referenceSchema.optional(),
  }),
) satisfies ZodType<Flag>

/**
 * Zod schema for FHIR Flag resource.
 */
export const flagSchema: ZodType<Flag> = untypedFlagSchema

/**
 * Wrapper class for FHIR Flag resources.
 */
export class FhirFlag extends FhirDomainResource<Flag> {
  /**
   * Parses a Flag resource from unknown data.
   *
   * @param value - The data to parse and validate against the Flag schema
   * @returns A FhirFlag instance containing the validated resource
   */
  public static parse(value: unknown): FhirFlag {
    return new FhirFlag(flagSchema.parse(value))
  }

  /**
   * Gets the flag code as display text.
   * Falls back to the first coding display if text is not present.
   *
   * @returns The code display text, if available
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Checks whether the flag period is active as of the given date.
   *
   * @param asOfDate - Optional date to check against (defaults to now)
   * @returns true if the period overlaps the given date
   */
  public periodIsActive(asOfDate?: Date): boolean {
    return FhirDomainResource.periodIsActive(this.value.period, asOfDate)
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
