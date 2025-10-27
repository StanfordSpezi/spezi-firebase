//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Ingredient } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const ingredientStatusSchema = z.enum(['active', 'inactive', 'entered-in-error'])

const ingredientManufacturerSchema = z.lazy(() =>
  backboneElementSchema.extend({
    role: codeableConceptSchema.optional(),
    manufacturer: referenceSchema,
  }),
)

const ingredientSubstanceSchema = z.lazy(() =>
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    strength: backboneElementSchema
      .extend({
        presentationRatio: ratioSchema.optional(),
        presentationQuantity: quantitySchema.optional(),
        concentrationRatio: ratioSchema.optional(),
        concentrationQuantity: quantitySchema.optional(),
        measurementPoint: stringSchema.optional(),
        _measurementPoint: elementSchema.optional(),
        country: codeableConceptSchema.array().optional(),
        referenceStrength: backboneElementSchema
          .extend({
            substance: codeableConceptSchema,
            strengthRatio: ratioSchema.optional(),
            strengthQuantity: quantitySchema.optional(),
            measurementPoint: stringSchema.optional(),
            _measurementPoint: elementSchema.optional(),
            country: codeableConceptSchema.array().optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
)

export const untypedIngredientSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Ingredient').readonly(),
    identifier: identifierSchema.optional(),
    status: ingredientStatusSchema,
    _status: elementSchema.optional(),
    for: referenceSchema.array().optional(),
    role: codeableConceptSchema,
    function: codeableConceptSchema.array().optional(),
    group: codeableConceptSchema.optional(),
    allergenicIndicator: z.boolean().optional(),
    _allergenicIndicator: elementSchema.optional(),
    manufacturer: ingredientManufacturerSchema.array().optional(),
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
