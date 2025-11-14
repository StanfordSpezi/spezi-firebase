//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Ingredient,
  type IngredientManufacturer,
  type IngredientSubstance,
  type IngredientSubstanceStrength,
  type IngredientSubstanceStrengthReferenceStrength,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codeableReferenceSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  ratioSchema,
  ratioRangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  ingredientStatusSchema,
  ingredientManufacturerRoleSchema,
} from '../valueSets/index.js'

const ingredientSubstanceStrengthReferenceStrengthSchema: ZodType<IngredientSubstanceStrengthReferenceStrength> =
  backboneElementSchema.extend({
    country: codeableConceptSchema.array().optional(),
    measurementPoint: stringSchema.optional(),
    _measurementPoint: elementSchema.optional(),
    strengthRatio: ratioSchema.optional(),
    strengthRatioRange: ratioRangeSchema.optional(),
    substance: codeableReferenceSchema.optional(),
  })

const ingredientSubstanceStrengthSchema: ZodType<IngredientSubstanceStrength> =
  backboneElementSchema.extend({
    concentrationRatio: ratioSchema.optional(),
    concentrationRatioRange: ratioRangeSchema.optional(),
    country: codeableConceptSchema.array().optional(),
    measurementPoint: stringSchema.optional(),
    _measurementPoint: elementSchema.optional(),
    presentationRatio: ratioSchema.optional(),
    presentationRatioRange: ratioRangeSchema.optional(),
    referenceStrength: ingredientSubstanceStrengthReferenceStrengthSchema
      .array()
      .optional(),
    textConcentration: stringSchema.optional(),
    _textConcentration: elementSchema.optional(),
    textPresentation: stringSchema.optional(),
    _textPresentation: elementSchema.optional(),
  })

const ingredientSubstanceSchema: ZodType<IngredientSubstance> =
  backboneElementSchema.extend({
    code: codeableReferenceSchema,
    strength: ingredientSubstanceStrengthSchema.array().optional(),
  })

const ingredientManufacturerSchema: ZodType<IngredientManufacturer> =
  backboneElementSchema.extend({
    manufacturer: referenceSchema,
    role: ingredientManufacturerRoleSchema.optional(),
    _role: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR Ingredient resource (untyped version).
 */
export const untypedIngredientSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Ingredient').readonly(),
    allergenicIndicator: booleanSchema.optional(),
    _allergenicIndicator: elementSchema.optional(),
    for: referenceSchema.array().optional(),
    function: codeableConceptSchema.array().optional(),
    identifier: identifierSchema.optional(),
    manufacturer: ingredientManufacturerSchema.array().optional(),
    role: codeableConceptSchema,
    status: ingredientStatusSchema,
    _status: elementSchema.optional(),
    substance: ingredientSubstanceSchema,
  }),
) satisfies ZodType<Ingredient>

/**
 * Zod schema for FHIR Ingredient resource.
 */
export const ingredientSchema: ZodType<Ingredient> = untypedIngredientSchema

/**
 * Wrapper class for FHIR Ingredient resources.
 * Provides utility methods for working with medication and product ingredients.
 */
export class FhirIngredient extends FhirDomainResource<Ingredient> {
  // Static Functions

  /**
   * Parses an Ingredient resource from unknown data.
   *
   * @param value - The data to parse and validate against the Ingredient schema
   * @returns A FhirIngredient instance containing the validated resource
   */
  public static parse(value: unknown): FhirIngredient {
    return new FhirIngredient(ingredientSchema.parse(value))
  }
}
