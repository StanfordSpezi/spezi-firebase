//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type NutritionOrder,
  type NutritionOrderEnteralFormula,
  type NutritionOrderEnteralFormulaAdministration,
  type NutritionOrderOralDiet,
  type NutritionOrderOralDietNutrient,
  type NutritionOrderOralDietTexture,
  type NutritionOrderSupplement,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  canonicalSchema,
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
import {
  nutritionOrderIntentSchema,
  nutritionOrderStatusSchema,
} from '../valueSets/index.js'

const nutritionOrderOralDietNutrientSchema: ZodType<NutritionOrderOralDietNutrient> =
  backboneElementSchema.extend({
    amount: quantitySchema.optional(),
    modifier: codeableConceptSchema.optional(),
  })

const nutritionOrderOralDietTextureSchema: ZodType<NutritionOrderOralDietTexture> =
  backboneElementSchema.extend({
    foodType: codeableConceptSchema.optional(),
    modifier: codeableConceptSchema.optional(),
  })

const nutritionOrderOralDietSchema: ZodType<NutritionOrderOralDiet> =
  backboneElementSchema.extend({
    fluidConsistencyType: codeableConceptSchema.array().optional(),
    instruction: stringSchema.optional(),
    _instruction: elementSchema.optional(),
    nutrient: nutritionOrderOralDietNutrientSchema.array().optional(),
    schedule: timingSchema.array().optional(),
    texture: nutritionOrderOralDietTextureSchema.array().optional(),
    type: codeableConceptSchema.array().optional(),
  })

const nutritionOrderSupplementSchema: ZodType<NutritionOrderSupplement> =
  backboneElementSchema.extend({
    instruction: stringSchema.optional(),
    _instruction: elementSchema.optional(),
    productName: stringSchema.optional(),
    _productName: elementSchema.optional(),
    quantity: quantitySchema.optional(),
    schedule: timingSchema.array().optional(),
    type: codeableConceptSchema.optional(),
  })

const nutritionOrderEnteralFormulaAdministrationSchema: ZodType<NutritionOrderEnteralFormulaAdministration> =
  backboneElementSchema.extend({
    quantity: quantitySchema.optional(),
    rateQuantity: quantitySchema.optional(),
    rateRatio: ratioSchema.optional(),
    schedule: timingSchema.optional(),
  })

const nutritionOrderEnteralFormulaSchema: ZodType<NutritionOrderEnteralFormula> =
  backboneElementSchema.extend({
    additiveProductName: stringSchema.optional(),
    _additiveProductName: elementSchema.optional(),
    additiveType: codeableConceptSchema.optional(),
    administrationInstruction: stringSchema.optional(),
    _administrationInstruction: elementSchema.optional(),
    administration: nutritionOrderEnteralFormulaAdministrationSchema
      .array()
      .optional(),
    baseFormulaProductName: stringSchema.optional(),
    _baseFormulaProductName: elementSchema.optional(),
    baseFormulaType: codeableConceptSchema.optional(),
    caloricDensity: quantitySchema.optional(),
    maxVolumeToDeliver: quantitySchema.optional(),
    routeofAdministration: codeableConceptSchema.optional(),
  })

/**
 * Zod schema for FHIR NutritionOrder resource (untyped version).
 */
export const untypedNutritionOrderSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('NutritionOrder').readonly(),
    allergyIntolerance: referenceSchema.array().optional(),
    dateTime: dateTimeSchema,
    _dateTime: elementSchema.optional(),
    encounter: referenceSchema.optional(),
    enteralFormula: nutritionOrderEnteralFormulaSchema.optional(),
    excludeFoodModifier: codeableConceptSchema.array().optional(),
    foodPreferenceModifier: codeableConceptSchema.array().optional(),
    identifier: identifierSchema.array().optional(),
    instantiates: uriSchema.array().optional(),
    _instantiates: elementSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    intent: nutritionOrderIntentSchema,
    _intent: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    oralDiet: nutritionOrderOralDietSchema.optional(),
    orderer: referenceSchema.optional(),
    patient: referenceSchema,
    status: nutritionOrderStatusSchema,
    _status: elementSchema.optional(),
    supplement: nutritionOrderSupplementSchema.array().optional(),
  }),
) satisfies ZodType<NutritionOrder>

/**
 * Zod schema for FHIR NutritionOrder resource.
 */
export const nutritionOrderSchema: ZodType<NutritionOrder> =
  untypedNutritionOrderSchema

/**
 * Wrapper class for FHIR NutritionOrder resources.
 * Provides utility methods for working with nutrition orders and dietary requests.
 */
export class FhirNutritionOrder extends FhirDomainResource<NutritionOrder> {
  /**
   * Parses a NutritionOrder resource from unknown data.
   *
   * @param value - The data to parse and validate against the NutritionOrder schema
   * @returns A FhirNutritionOrder instance containing the validated resource
   */
  public static parse(value: unknown): FhirNutritionOrder {
    return new FhirNutritionOrder(nutritionOrderSchema.parse(value))
  }

  /**
   * Get the date/time the order was made.
   *
   * @returns The dateTime the order was made, or undefined if not set
   */
  public get dateTime(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.dateTime)
  }
}
