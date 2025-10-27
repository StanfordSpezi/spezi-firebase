//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Lifecycle status of the questionnaire.
 */
export const questionnaireStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

/**
 * Distinguishes groups from questions and display text and indicates data type for questions.
 */
export const questionnaireItemTypeSchema = z.enum([
  'group',
  'display',
  'boolean',
  'decimal',
  'integer',
  'date',
  'dateTime',
  'time',
  'string',
  'text',
  'url',
  'choice',
  'open-choice',
  'attachment',
  'reference',
  'quantity',
])

/**
 * Controls how multiple enableWhen values are interpreted.
 */
export const questionnaireItemEnableBehaviorSchema = z.enum(['all', 'any'])

/**
 * The criteria by which a question is enabled.
 */
export const questionnaireItemEnableWhenOperatorSchema = z.enum([
  'exists',
  '=',
  '!=',
  '>',
  '<',
  '>=',
  '<=',
])
