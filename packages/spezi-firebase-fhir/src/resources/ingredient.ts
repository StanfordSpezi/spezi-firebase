//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Ingredient } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedIngredientSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Ingredient').readonly(),
  }).passthrough(),
)

export const ingredientSchema = untypedIngredientSchema

export class FhirIngredient extends FhirDomainResource<Ingredient> {
  // Static Functions

  public static parse(value: unknown): FhirIngredient {
    const parsed = ingredientSchema.parse(value)
    return new FhirIngredient(parsed as unknown as Ingredient)
  }
}
