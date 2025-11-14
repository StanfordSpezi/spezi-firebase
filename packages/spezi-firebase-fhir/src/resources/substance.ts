//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type SubstanceIngredient,
  type SubstanceInstance,
  type Substance,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { substanceStatusSchema } from '../valueSets/index.js'

const substanceInstanceSchema: ZodType<SubstanceInstance> =
  backboneElementSchema.extend({
    identifier: identifierSchema.optional(),
    expiry: dateTimeSchema.optional(),
    _expiry: elementSchema.optional(),
    quantity: quantitySchema.optional(),
  })

const substanceIngredientSchema: ZodType<SubstanceIngredient> =
  backboneElementSchema.extend({
    quantity: ratioSchema.optional(),
    substanceCodeableConcept: codeableConceptSchema.optional(),
    substanceReference: referenceSchema.optional(),
  })

/**
 * Zod schema for FHIR Substance resource (untyped version).
 */
export const untypedSubstanceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Substance').readonly(),
    identifier: identifierSchema.array().optional(),
    status: substanceStatusSchema,
    _status: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema,
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    instance: substanceInstanceSchema.array().optional(),
    ingredient: substanceIngredientSchema.array().optional(),
  }),
) satisfies ZodType<Substance>

/**
 * Zod schema for FHIR Substance resource.
 */
export const substanceSchema: ZodType<Substance> = untypedSubstanceSchema

/**
 * Wrapper class for FHIR Substance resources.
 * Provides utility methods for working with substance information.
 */
export class FhirSubstance extends FhirDomainResource<Substance> {
  /**
   * Parses a Substance resource from unknown data.
   *
   * @param value - The data to parse and validate against the Substance schema
   * @returns A FhirSubstance instance containing the validated resource
   */
  public static parse(value: unknown): FhirSubstance {
    return new FhirSubstance(substanceSchema.parse(value))
  }

  /**
   * Gets the substance code display text.
   *
   * @returns The code display text, if available
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
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
