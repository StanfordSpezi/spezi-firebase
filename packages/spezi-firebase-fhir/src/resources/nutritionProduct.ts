//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type NutritionProduct } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  attachmentSchema,
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

const nutritionProductStatusSchema = z.enum(['active', 'inactive', 'entered-in-error'])

const nutritionProductNutrientSchema = z.lazy(() =>
  backboneElementSchema.extend({
    item: codeableConceptSchema.optional(),
    amount: ratioSchema.array().optional(),
  }),
)

const nutritionProductIngredientSchema = z.lazy(() =>
  backboneElementSchema.extend({
    item: codeableConceptSchema,
    amount: ratioSchema.array().optional(),
  }),
)

const nutritionProductCharacteristicSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueBase64Binary: stringSchema.optional(),
    _valueBase64Binary: elementSchema.optional(),
    valueAttachment: attachmentSchema.optional(),
    valueBoolean: z.boolean().optional(),
    _valueBoolean: elementSchema.optional(),
  }),
)

const nutritionProductInstanceSchema = z.lazy(() =>
  backboneElementSchema.extend({
    quantity: quantitySchema.optional(),
    identifier: identifierSchema.array().optional(),
    lotNumber: stringSchema.optional(),
    _lotNumber: elementSchema.optional(),
    expiry: stringSchema.optional(),
    _expiry: elementSchema.optional(),
    useBy: stringSchema.optional(),
    _useBy: elementSchema.optional(),
  }),
)

export const untypedNutritionProductSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('NutritionProduct').readonly(),
    status: nutritionProductStatusSchema,
    _status: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    manufacturer: referenceSchema.array().optional(),
    nutrient: nutritionProductNutrientSchema.array().optional(),
    ingredient: nutritionProductIngredientSchema.array().optional(),
    knownAllergen: codeableConceptSchema.array().optional(),
    productCharacteristic: nutritionProductCharacteristicSchema.array().optional(),
    instance: nutritionProductInstanceSchema.optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<NutritionProduct>

export const nutritionProductSchema: ZodType<NutritionProduct> =
  untypedNutritionProductSchema

export class FhirNutritionProduct extends FhirDomainResource<NutritionProduct> {
  // Static Functions

  public static parse(value: unknown): FhirNutritionProduct {
    return new FhirNutritionProduct(nutritionProductSchema.parse(value))
  }
}
