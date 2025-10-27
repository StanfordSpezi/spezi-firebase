//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { NutritionOrder } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedNutritionOrderSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('NutritionOrder').readonly(),
    })
    .passthrough(),
)

export const nutritionOrderSchema = untypedNutritionOrderSchema

export class FhirNutritionOrder extends FhirDomainResource<NutritionOrder> {
  // Static Functions

  public static parse(value: unknown): FhirNutritionOrder {
    const parsed = nutritionOrderSchema.parse(value)
    return new FhirNutritionOrder(parsed as unknown as NutritionOrder)
  }
}
