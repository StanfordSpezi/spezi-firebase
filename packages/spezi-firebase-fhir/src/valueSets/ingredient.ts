//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Allows filtering of ingredient that are appropriate for use versus not.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export const ingredientStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

/**
 * Allows filtering of ingredient that are appropriate for use versus not.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export type IngredientStatus = z.infer<typeof ingredientStatusSchema>

/**
 * The way in which a manufacturer is associated with the ingredient.
 * http://hl7.org/fhir/valueset-ingredient-manufacturer-role.html
 */
export const ingredientManufacturerRoleSchema = z.enum([
  'allowed',
  'possible',
  'actual',
])

/**
 * The way in which a manufacturer is associated with the ingredient.
 * http://hl7.org/fhir/valueset-ingredient-manufacturer-role.html
 */
export type IngredientManufacturerRole = z.infer<
  typeof ingredientManufacturerRoleSchema
>
