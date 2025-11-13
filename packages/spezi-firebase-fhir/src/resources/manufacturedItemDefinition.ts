//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type ManufacturedItemDefinition,
  type ManufacturedItemDefinitionProperty,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
} from '../elements/index.js'
import { manufacturedItemDefinitionStatusSchema } from '../valueSets/index.js'

const manufacturedItemDefinitionPropertySchema: ZodType<ManufacturedItemDefinitionProperty> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueDate: dateSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueAttachment: attachmentSchema.optional(),
  })

/**
 * Zod schema for FHIR ManufacturedItemDefinition resource (untyped version).
 */
export const untypedManufacturedItemDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ManufacturedItemDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    ingredient: codeableConceptSchema.array().optional(),
    manufacturedDoseForm: codeableConceptSchema,
    manufacturer: referenceSchema.array().optional(),
    property: manufacturedItemDefinitionPropertySchema.array().optional(),
    status: manufacturedItemDefinitionStatusSchema,
    _status: elementSchema.optional(),
    unitOfPresentation: codeableConceptSchema.optional(),
  }),
) satisfies ZodType<ManufacturedItemDefinition>

/**
 * Zod schema for FHIR ManufacturedItemDefinition resource.
 */
export const manufacturedItemDefinitionSchema: ZodType<ManufacturedItemDefinition> =
  untypedManufacturedItemDefinitionSchema

/**
 * Wrapper class for FHIR ManufacturedItemDefinition resources.
 * Provides utility methods for working with manufactured item definitions and product specifications.
 */
export class FhirManufacturedItemDefinition extends FhirDomainResource<ManufacturedItemDefinition> {
  // Static Functions

  /**
   * Parses a ManufacturedItemDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the ManufacturedItemDefinition schema
   * @returns A FhirManufacturedItemDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirManufacturedItemDefinition {
    return new FhirManufacturedItemDefinition(
      manufacturedItemDefinitionSchema.parse(value),
    )
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
