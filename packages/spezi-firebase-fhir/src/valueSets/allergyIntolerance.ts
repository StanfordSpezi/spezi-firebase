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
 */
export const allergyIntoleranceCategorySchema = z.enum([
  'food',
  'medication',
  'environment',
  'biologic',
])

/**
 * Estimate of the potential clinical harm, or seriousness, of a reaction to an identified substance.
 */
export const allergyIntoleranceCriticalitySchema = z.enum([
  'low',
  'high',
  'unable-to-assess',
])

/**
 * Identification of the underlying physiological mechanism for a Reaction Risk.
 */
export const allergyIntoleranceTypeSchema = z.enum(['allergy', 'intolerance'])

/**
 * Clinical assessment of the severity of a reaction event as a whole.
 */
export const allergyIntoleranceReactionSeveritySchema = z.enum([
  'mild',
  'moderate',
  'severe',
])
