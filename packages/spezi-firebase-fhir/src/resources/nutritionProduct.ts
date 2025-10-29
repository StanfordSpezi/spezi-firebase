//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type NutritionProduct,
  type NutritionProductIngredient,
  type NutritionProductInstance,
  type NutritionProductNutrient,
  type NutritionProductProductCharacteristic,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  attachmentSchema,
  backboneElementSchema,
  base64BinarySchema,
  booleanSchema,
  codeableConceptSchema,
  codeableReferenceSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { nutritionProductStatusSchema } from '../valueSets/index.js'

const nutritionProductNutrientSchema: ZodType<NutritionProductNutrient> =
  z.lazy(() =>
    backboneElementSchema.extend({
      amount: ratioSchema.array().optional(),
      item: codeableReferenceSchema.optional(),
    }),
  )

const nutritionProductIngredientSchema: ZodType<NutritionProductIngredient> =
  z.lazy(() =>
    backboneElementSchema.extend({
      amount: ratioSchema.array().optional(),
      item: codeableReferenceSchema,
    }),
  )

const nutritionProductProductCharacteristicSchema: ZodType<NutritionProductProductCharacteristic> =
  z.lazy(() =>
    backboneElementSchema.extend({
      type: codeableConceptSchema,
      valueCodeableConcept: codeableConceptSchema.optional(),
      valueString: stringSchema.optional(),
      _valueString: elementSchema.optional(),
      valueQuantity: quantitySchema.optional(),
      valueBase64Binary: base64BinarySchema.optional(),
      _valueBase64Binary: elementSchema.optional(),
      valueAttachment: attachmentSchema.optional(),
      valueBoolean: booleanSchema.optional(),
      _valueBoolean: elementSchema.optional(),
    }),
  )

const nutritionProductInstanceSchema: ZodType<NutritionProductInstance> =
  z.lazy(() =>
    backboneElementSchema.extend({
      expiry: dateTimeSchema.optional(),
      _expiry: elementSchema.optional(),
      identifier: identifierSchema.array().optional(),
      lotNumber: stringSchema.optional(),
      _lotNumber: elementSchema.optional(),
      quantity: quantitySchema.optional(),
      useBy: dateTimeSchema.optional(),
      _useBy: elementSchema.optional(),
    }),
  )

export const untypedNutritionProductSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('NutritionProduct').readonly(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    ingredient: nutritionProductIngredientSchema.array().optional(),
    instance: nutritionProductInstanceSchema.optional(),
    knownAllergen: codeableReferenceSchema.array().optional(),
    manufacturer: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    nutrient: nutritionProductNutrientSchema.array().optional(),
    productCharacteristic: nutritionProductProductCharacteristicSchema
      .array()
      .optional(),
    status: nutritionProductStatusSchema,
    _status: elementSchema.optional(),
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
