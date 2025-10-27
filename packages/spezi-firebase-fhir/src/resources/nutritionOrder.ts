//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type NutritionOrder } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
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
  timingSchema,
  uriSchema,
} from '../elements/index.js'

const nutritionOrderStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

const nutritionOrderIntentSchema = z.enum([
  'proposal',
  'plan',
  'directive',
  'order',
  'original-order',
  'reflex-order',
  'filler-order',
  'instance-order',
  'option',
])

const oralDietNutrientSchema = z.lazy(() =>
  backboneElementSchema.extend({
    modifier: codeableConceptSchema.optional(),
    amount: quantitySchema.optional(),
  }),
)

const oralDietTextureSchema = z.lazy(() =>
  backboneElementSchema.extend({
    modifier: codeableConceptSchema.optional(),
    foodType: codeableConceptSchema.optional(),
  }),
)

const oralDietSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema.array().optional(),
    schedule: timingSchema.array().optional(),
    nutrient: oralDietNutrientSchema.array().optional(),
    texture: oralDietTextureSchema.array().optional(),
    fluidConsistencyType: codeableConceptSchema.array().optional(),
    instruction: stringSchema.optional(),
    _instruction: elementSchema.optional(),
  }),
)

const supplementNutrientSchema = z.lazy(() =>
  backboneElementSchema.extend({
    modifier: codeableConceptSchema.optional(),
    amount: quantitySchema.optional(),
  }),
)

const supplementSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    productName: stringSchema.optional(),
    _productName: elementSchema.optional(),
    schedule: timingSchema.array().optional(),
    quantity: quantitySchema.optional(),
    instruction: stringSchema.optional(),
    _instruction: elementSchema.optional(),
  }),
)

const enteralFormulaAdministrationSchema = z.lazy(() =>
  backboneElementSchema.extend({
    schedule: timingSchema.optional(),
    quantity: quantitySchema.optional(),
    rateQuantity: quantitySchema.optional(),
    rateRatio: ratioSchema.optional(),
  }),
)

const enteralFormulaSchema = z.lazy(() =>
  backboneElementSchema.extend({
    baseFormulaType: codeableConceptSchema.optional(),
    baseFormulaProductName: stringSchema.optional(),
    _baseFormulaProductName: elementSchema.optional(),
    additiveType: codeableConceptSchema.optional(),
    additiveProductName: stringSchema.optional(),
    _additiveProductName: elementSchema.optional(),
    caloricDensity: quantitySchema.optional(),
    routeofAdministration: codeableConceptSchema.optional(),
    administration: enteralFormulaAdministrationSchema.array().optional(),
    maxVolumeToDeliver: quantitySchema.optional(),
    administrationInstruction: stringSchema.optional(),
    _administrationInstruction: elementSchema.optional(),
  }),
)

export const untypedNutritionOrderSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('NutritionOrder').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: uriSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    instantiates: uriSchema.array().optional(),
    _instantiates: elementSchema.array().optional(),
    status: nutritionOrderStatusSchema,
    _status: elementSchema.optional(),
    intent: nutritionOrderIntentSchema,
    _intent: elementSchema.optional(),
    patient: referenceSchema,
    encounter: referenceSchema.optional(),
    dateTime: dateTimeSchema,
    _dateTime: elementSchema.optional(),
    orderer: referenceSchema.optional(),
    allergyIntolerance: referenceSchema.array().optional(),
    foodPreferenceModifier: codeableConceptSchema.array().optional(),
    excludeFoodModifier: codeableConceptSchema.array().optional(),
    oralDiet: oralDietSchema.optional(),
    supplement: supplementSchema.array().optional(),
    enteralFormula: enteralFormulaSchema.optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<NutritionOrder>

export const nutritionOrderSchema: ZodType<NutritionOrder> =
  untypedNutritionOrderSchema

export class FhirNutritionOrder extends FhirDomainResource<NutritionOrder> {
  // Static Functions

  public static parse(value: unknown): FhirNutritionOrder {
    return new FhirNutritionOrder(nutritionOrderSchema.parse(value))
  }
}
