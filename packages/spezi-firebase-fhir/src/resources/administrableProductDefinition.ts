//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type AdministrableProductDefinition,
  type AdministrableProductDefinitionProperty,
  type AdministrableProductDefinitionRouteOfAdministration,
  type AdministrableProductDefinitionRouteOfAdministrationTargetSpecies,
  type AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriod,
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
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { administrableProductDefinitionStatusSchema } from '../valueSets/index.js'

const administrableProductDefinitionPropertySchema: ZodType<AdministrableProductDefinitionProperty> =
  backboneElementSchema.extend({
    status: codeableConceptSchema.optional(),
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueDate: dateSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueAttachment: attachmentSchema.optional(),
  })

const administrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriodSchema: ZodType<AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriod> =
  backboneElementSchema.extend({
    supportingInformation: stringSchema.optional(),
    _supportingInformation: elementSchema.optional(),
    tissue: codeableConceptSchema,
    value: quantitySchema,
  })

const administrableProductDefinitionRouteOfAdministrationTargetSpeciesSchema: ZodType<AdministrableProductDefinitionRouteOfAdministrationTargetSpecies> =
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    withdrawalPeriod:
      administrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriodSchema
        .array()
        .optional(),
  })

const administrableProductDefinitionRouteOfAdministrationSchema: ZodType<AdministrableProductDefinitionRouteOfAdministration> =
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    firstDose: quantitySchema.optional(),
    maxDosePerDay: quantitySchema.optional(),
    maxDosePerTreatmentPeriod: ratioSchema.optional(),
    maxSingleDose: quantitySchema.optional(),
    maxTreatmentPeriod: quantitySchema.optional(),
    targetSpecies:
      administrableProductDefinitionRouteOfAdministrationTargetSpeciesSchema
        .array()
        .optional(),
  })

/**
 * Zod schema for FHIR AdministrableProductDefinition resource (untyped version).
 */
export const untypedAdministrableProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AdministrableProductDefinition').readonly(),
    administrableDoseForm: codeableConceptSchema.optional(),
    device: referenceSchema.optional(),
    formOf: referenceSchema.array().optional(),
    identifier: identifierSchema.array().optional(),
    ingredient: codeableConceptSchema.array().optional(),
    producedFrom: referenceSchema.array().optional(),
    property: administrableProductDefinitionPropertySchema.array().optional(),
    routeOfAdministration:
      administrableProductDefinitionRouteOfAdministrationSchema.array(),
    status: administrableProductDefinitionStatusSchema,
    _status: elementSchema.optional(),
    unitOfPresentation: codeableConceptSchema.optional(),
  }),
) satisfies ZodType<AdministrableProductDefinition>

/**
 * Zod schema for FHIR AdministrableProductDefinition resource.
 */
export const administrableProductDefinitionSchema: ZodType<AdministrableProductDefinition> =
  untypedAdministrableProductDefinitionSchema

/**
 * Wrapper class for FHIR AdministrableProductDefinition resources.
 * Provides utility methods for working with administrable product definitions.
 */
export class FhirAdministrableProductDefinition extends FhirDomainResource<AdministrableProductDefinition> {
  // Static Functions

  /**
   * Parses an AdministrableProductDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the AdministrableProductDefinition schema
   * @returns A FhirAdministrableProductDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirAdministrableProductDefinition {
    return new FhirAdministrableProductDefinition(
      administrableProductDefinitionSchema.parse(value),
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
