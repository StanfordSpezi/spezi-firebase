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
import { FhirDomainResource } from './domainResourceClass.js'
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
  z.lazy(() =>
    backboneElementSchema.extend({
      country: codeableConceptSchema.array().optional(),
      measurementPoint: stringSchema.optional(),
      _measurementPoint: elementSchema.optional(),
      strengthRatio: ratioSchema.optional(),
      strengthRatioRange: ratioRangeSchema.optional(),
      substance: codeableReferenceSchema.optional(),
    }),
  )

const ingredientSubstanceStrengthSchema: ZodType<IngredientSubstanceStrength> =
  z.lazy(() =>
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
    }),
  )

const ingredientSubstanceSchema: ZodType<IngredientSubstance> = z.lazy(() =>
  backboneElementSchema.extend({
    code: codeableReferenceSchema,
    strength: ingredientSubstanceStrengthSchema.array().optional(),
  }),
)

const ingredientManufacturerSchema: ZodType<IngredientManufacturer> = z.lazy(
  () =>
    backboneElementSchema.extend({
      manufacturer: referenceSchema,
      role: ingredientManufacturerRoleSchema.optional(),
      _role: elementSchema.optional(),
    }),
)

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

export const ingredientSchema: ZodType<Ingredient> = untypedIngredientSchema

export class FhirIngredient extends FhirDomainResource<Ingredient> {
  // Static Functions

  public static parse(value: unknown): FhirIngredient {
    return new FhirIngredient(ingredientSchema.parse(value))
  }
}
