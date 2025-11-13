//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Category of an identified substance associated with allergies or intolerances.
 * http://hl7.org/fhir/valueset-allergy-intolerance-category.html
 */
export const allergyIntoleranceCategorySchema = z.enum([
  'food',
  'medication',
  'environment',
  'biologic',
])

/**
 * Category of an identified substance associated with allergies or intolerances.
 * http://hl7.org/fhir/valueset-allergy-intolerance-category.html
 */
export type AllergyIntoleranceCategory = z.infer<
  typeof allergyIntoleranceCategorySchema
>

/**
 * Estimate of the potential clinical harm, or seriousness, of a reaction to an identified substance.
 * http://hl7.org/fhir/valueset-allergy-intolerance-criticality.html
 */
export const allergyIntoleranceCriticalitySchema = z.enum([
  'low',
  'high',
  'unable-to-assess',
])

/**
 * Estimate of the potential clinical harm, or seriousness, of a reaction to an identified substance.
 * http://hl7.org/fhir/valueset-allergy-intolerance-criticality.html
 */
export type AllergyIntoleranceCriticality = z.infer<
  typeof allergyIntoleranceCriticalitySchema
>

/**
 * Clinical assessment of the severity of a reaction event as a whole.
 * http://hl7.org/fhir/valueset-reaction-event-severity.html
 */
export const allergyIntoleranceReactionSeveritySchema = z.enum([
  'mild',
  'moderate',
  'severe',
])

/**
 * Clinical assessment of the severity of a reaction event as a whole.
 * http://hl7.org/fhir/valueset-reaction-event-severity.html
 */
export type AllergyIntoleranceReactionSeverity = z.infer<
  typeof allergyIntoleranceReactionSeveritySchema
>

/**
 * Identification of the underlying physiological mechanism for a Reaction Risk.
 * http://hl7.org/fhir/valueset-allergy-intolerance-type.html
 */
export const allergyIntoleranceTypeSchema = z.enum(['allergy', 'intolerance'])

/**
 * Identification of the underlying physiological mechanism for a Reaction Risk.
 * http://hl7.org/fhir/valueset-allergy-intolerance-type.html
 */
export type AllergyIntoleranceType = z.infer<
  typeof allergyIntoleranceTypeSchema
>
