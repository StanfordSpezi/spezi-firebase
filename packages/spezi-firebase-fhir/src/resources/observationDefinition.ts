//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ObservationDefinitionQualifiedInterval,
  type ObservationDefinitionQuantitativeDetails,
  type ObservationDefinition,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  administrativeGenderSchema,
  observationDefinitionPermittedDataTypeSchema,
  observationDefinitionRangeCategorySchema,
} from '../valueSets/index.js'

const observationDefinitionQuantitativeDetailsSchema: ZodType<ObservationDefinitionQuantitativeDetails> =
  backboneElementSchema.extend({
    conversionFactor: decimalSchema.optional(),
    decimalPrecision: intSchema.optional(),
    unit: codeableConceptSchema.optional(),
    customaryUnit: codeableConceptSchema.optional(),
  })

const observationDefinitionQualifiedIntervalSchema: ZodType<ObservationDefinitionQualifiedInterval> =
  backboneElementSchema.extend({
    category: observationDefinitionRangeCategorySchema.optional(),
    _category: elementSchema.optional(),
    range: rangeSchema.optional(),
    context: codeableConceptSchema.optional(),
    appliesTo: codeableConceptSchema.array().optional(),
    gender: administrativeGenderSchema.optional(),
    _gender: elementSchema.optional(),
    age: rangeSchema.optional(),
    gestationalAge: rangeSchema.optional(),
    condition: stringSchema.optional(),
    _condition: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR ObservationDefinition resource (untyped version).
 */
export const untypedObservationDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ObservationDefinition').readonly(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema,
    identifier: identifierSchema.array().optional(),
    permittedDataType: observationDefinitionPermittedDataTypeSchema
      .array()
      .optional(),
    _permittedDataType: elementSchema.array().optional(),
    multipleResultsAllowed: booleanSchema.optional(),
    _multipleResultsAllowed: elementSchema.optional(),
    method: codeableConceptSchema.optional(),
    preferredReportName: stringSchema.optional(),
    _preferredReportName: elementSchema.optional(),
    quantitativeDetails:
      observationDefinitionQuantitativeDetailsSchema.optional(),
    qualifiedInterval: observationDefinitionQualifiedIntervalSchema
      .array()
      .optional(),
    validCodedValueSet: referenceSchema.optional(),
    normalCodedValueSet: referenceSchema.optional(),
    abnormalCodedValueSet: referenceSchema.optional(),
    criticalCodedValueSet: referenceSchema.optional(),
  }),
) satisfies ZodType<ObservationDefinition>

/**
 * Zod schema for FHIR ObservationDefinition resource.
 */
export const observationDefinitionSchema: ZodType<ObservationDefinition> =
  untypedObservationDefinitionSchema

/**
 * Wrapper class for FHIR ObservationDefinition resources.
 * Provides utility methods for working with observation definitions and test specifications.
 */
export class FhirObservationDefinition extends FhirDomainResource<ObservationDefinition> {
  // Static Functions

  /**
   * Parses an ObservationDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the ObservationDefinition schema
   * @returns A FhirObservationDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirObservationDefinition {
    return new FhirObservationDefinition(
      observationDefinitionSchema.parse(value),
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
