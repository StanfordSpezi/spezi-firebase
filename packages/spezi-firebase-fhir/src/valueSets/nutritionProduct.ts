//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the nutrition product.
 * http://hl7.org/fhir/valueset-nutrition-product-status.html
 */
export const nutritionProductStatusSchema = z.enum([
  'active',
  'inactive',
  'entered-in-error',
])

export type NutritionProductStatus = z.infer<
  typeof nutritionProductStatusSchema
>
