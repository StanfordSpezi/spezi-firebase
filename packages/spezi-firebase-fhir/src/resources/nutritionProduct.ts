//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type NutritionProduct } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedNutritionProductSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('NutritionProduct').readonly(),
    })
    .passthrough(),
)

export const nutritionProductSchema = untypedNutritionProductSchema

export class FhirNutritionProduct extends FhirDomainResource<NutritionProduct> {
  // Static Functions

  public static parse(value: unknown): FhirNutritionProduct {
    const parsed = nutritionProductSchema.parse(value)
    return new FhirNutritionProduct(parsed as unknown as NutritionProduct)
  }
}
