//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR SearchParameterComparator value set.
 * Comparators supported for search parameters.
 */
export const searchParameterComparatorSchema = z.enum([
  'eq',
  'ne',
  'gt',
  'lt',
  'ge',
  'le',
  'sa',
  'eb',
  'ap',
])

/**
 * TypeScript type for FHIR SearchParameterComparator value set.
 */
export type SearchParameterComparator = z.infer<
  typeof searchParameterComparatorSchema
>

/**
 * Zod schema for FHIR SearchParameterModifier value set.
 * Modifiers supported for search parameters.
 */
export const searchParameterModifierSchema = z.enum([
  'missing',
  'exact',
  'contains',
  'not',
  'text',
  'in',
  'not-in',
  'below',
  'above',
  'type',
  'identifier',
  'ofType',
])

/**
 * TypeScript type for FHIR SearchParameterModifier value set.
 */
export type SearchParameterModifier = z.infer<
  typeof searchParameterModifierSchema
>

/**
 * Zod schema for FHIR SearchParameterType value set.
 * Data types allowed to be used for search parameters.
 */
export const searchParameterTypeSchema = z.enum([
  'number',
  'date',
  'string',
  'token',
  'reference',
  'composite',
  'quantity',
  'uri',
  'special',
])

/**
 * TypeScript type for FHIR SearchParameterType value set.
 */
export type SearchParameterType = z.infer<typeof searchParameterTypeSchema>

/**
 * Zod schema for FHIR SearchParameterXpathUsage value set.
 * How XPath is used in search parameter evaluation.
 */
export const searchParameterXpathUsageSchema = z.enum([
  'normal',
  'phonetic',
  'nearby',
  'distance',
  'other',
])

/**
 * TypeScript type for FHIR SearchParameterXpathUsage value set.
 */
export type SearchParameterXpathUsage = z.infer<
  typeof searchParameterXpathUsageSchema
>
