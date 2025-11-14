//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Group } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
  unsignedIntSchema,
} from '../elements/index.js'
import { groupTypeSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR Group resource (untyped version).
 */
export const untypedGroupSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Group').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    type: groupTypeSchema,
    _type: elementSchema.optional(),
    actual: booleanSchema,
    _actual: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    quantity: unsignedIntSchema.optional(),
    _quantity: elementSchema.optional(),
    managingEntity: referenceSchema.optional(),
    characteristic: backboneElementSchema
      .extend({
        code: codeableConceptSchema,
        valueCodeableConcept: codeableConceptSchema.optional(),
        valueBoolean: booleanSchema.optional(),
        _valueBoolean: elementSchema.optional(),
        valueQuantity: quantitySchema.optional(),
        valueRange: rangeSchema.optional(),
        valueReference: referenceSchema.optional(),
        exclude: booleanSchema,
        _exclude: elementSchema.optional(),
        period: periodSchema.optional(),
      })
      .array()
      .optional(),
    member: backboneElementSchema
      .extend({
        entity: referenceSchema,
        period: periodSchema.optional(),
        inactive: booleanSchema.optional(),
        _inactive: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Group>

/**
 * Zod schema for FHIR Group resource.
 */
export const groupSchema: ZodType<Group> = untypedGroupSchema

/**
 * Wrapper class for FHIR Group resources.
 * Provides utility methods for working with groups of individuals, organizations, or other entities.
 */
export class FhirGroup extends FhirDomainResource<Group> {
  /**
   * Parses a Group resource from unknown data.
   *
   * @param value - The data to parse and validate against the Group schema
   * @returns A FhirGroup instance containing the validated resource
   */
  public static parse(value: unknown): FhirGroup {
    return new FhirGroup(groupSchema.parse(value))
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
