//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Basic } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  codeableConceptSchema,
  dateSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
} from '../elements/index.js'

/**
 * Zod schema for FHIR Basic resource (untyped version).
 */
export const untypedBasicSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Basic').readonly(),
    identifier: identifierSchema.array().optional(),
    code: codeableConceptSchema,
    subject: referenceSchema.optional(),
    created: dateSchema.optional(),
    _created: elementSchema.optional(),
    author: referenceSchema.optional(),
  }),
) satisfies ZodType<Basic>

/**
 * Zod schema for FHIR Basic resource.
 */
export const basicSchema: ZodType<Basic> = untypedBasicSchema

/**
 * Wrapper class for FHIR Basic resources.
 * Provides identifier helper accessors and parsing convenience.
 */
export class FhirBasic extends FhirDomainResource<Basic> {
  // Static Functions

  /**
   * Parses a Basic resource from unknown data.
   *
   * @param value - The data to parse and validate against the Basic schema
   * @returns A FhirBasic instance containing the validated resource
   */
  public static parse(value: unknown): FhirBasic {
    return new FhirBasic(basicSchema.parse(value))
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
