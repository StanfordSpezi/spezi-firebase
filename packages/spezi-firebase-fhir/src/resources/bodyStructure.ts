//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type BodyStructure } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  attachmentSchema,
  booleanSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

/**
 * Zod schema for FHIR BodyStructure resource (untyped version).
 */
export const untypedBodyStructureSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('BodyStructure').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    morphology: codeableConceptSchema.optional(),
    location: codeableConceptSchema.optional(),
    locationQualifier: codeableConceptSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    image: attachmentSchema.array().optional(),
    patient: referenceSchema,
  }),
) satisfies ZodType<BodyStructure>

/**
 * Zod schema for FHIR BodyStructure resource.
 */
export const bodyStructureSchema: ZodType<BodyStructure> =
  untypedBodyStructureSchema

/**
 * Wrapper class for FHIR BodyStructure resources.
 * Provides utility methods for working with body structure information.
 */
export class FhirBodyStructure extends FhirDomainResource<BodyStructure> {
  /**
   * Parses a BodyStructure resource from unknown data.
   *
   * @param value - The data to parse and validate against the BodyStructure schema
   * @returns A FhirBodyStructure instance containing the validated resource
   */
  public static parse(value: unknown): FhirBodyStructure {
    return new FhirBodyStructure(bodyStructureSchema.parse(value))
  }

  /**
   * Gets the location display text for the body structure.
   *
   * @returns The location display text, if available
   */
  public get locationDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.location)
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
