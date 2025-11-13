//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The extent of the content of the code system.
 * http://hl7.org/fhir/valueset-codesystem-content-mode.html
 */
export const codeSystemContentSchema = z.enum([
  'not-present',
  'example',
  'fragment',
  'complete',
  'supplement',
])

/**
 * The extent of the content of the code system.
 * http://hl7.org/fhir/valueset-codesystem-content-mode.html
 */
export type CodeSystemContent = z.infer<typeof codeSystemContentSchema>

/**
 * The meaning of the hierarchy of concepts in a code system.
 * http://hl7.org/fhir/valueset-codesystem-hierarchy-meaning.html
 */
export const codeSystemHierarchyMeaningSchema = z.enum([
  'grouped-by',
  'is-a',
  'part-of',
  'classified-with',
])

/**
 * The meaning of the hierarchy of concepts in a code system.
 * http://hl7.org/fhir/valueset-codesystem-hierarchy-meaning.html
 */
export type CodeSystemHierarchyMeaning = z.infer<
  typeof codeSystemHierarchyMeaningSchema
>

/**
 * The type of a property value.
 * http://hl7.org/fhir/valueset-concept-property-type.html
 */
export const codeSystemPropertyTypeSchema = z.enum([
  'code',
  'Coding',
  'string',
  'integer',
  'boolean',
  'dateTime',
  'decimal',
])

/**
 * The type of a property value.
 * http://hl7.org/fhir/valueset-concept-property-type.html
 */
export type CodeSystemPropertyType = z.infer<
  typeof codeSystemPropertyTypeSchema
>

/**
 * Operations supported for $lookup and value set filters.
 * http://hl7.org/fhir/valueset-filter-operator.html
 */
export const filterOperatorSchema = z.enum([
  '=',
  'is-a',
  'descendent-of',
  'is-not-a',
  'regex',
  'in',
  'not-in',
  'generalizes',
  'exists',
])

/**
 * Operations supported for $lookup and value set filters.
 * http://hl7.org/fhir/valueset-filter-operator.html
 */
export type FilterOperator = z.infer<typeof filterOperatorSchema>
