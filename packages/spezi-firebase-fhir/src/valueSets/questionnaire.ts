//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The lifecycle status of an artifact.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export const questionnaireStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export type QuestionnaireStatus = z.infer<typeof questionnaireStatusSchema>

/**
 * Distinguishes groups from questions and display text and indicates data type for questions.
 * http://hl7.org/fhir/valueset-item-type.html
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

export type QuestionnaireItemType = z.infer<typeof questionnaireItemTypeSchema>

/**
 * Controls how multiple enableWhen values are interpreted - whether all or any must be true.
 * http://hl7.org/fhir/valueset-questionnaire-enable-behavior.html
 */
export const questionnaireItemEnableBehaviorSchema = z.enum(['all', 'any'])

export type QuestionnaireItemEnableBehavior = z.infer<
  typeof questionnaireItemEnableBehaviorSchema
>

/**
 * The criteria by which a question is enabled.
 * http://hl7.org/fhir/valueset-questionnaire-enable-operator.html
 */
export const questionnaireItemEnableWhenOperatorSchema = z.enum([
  'exists',
  '=',
  '!=',
  '<',
  '<=',
  '>',
  '>=',
])

export type QuestionnaireItemEnableWhenOperator = z.infer<
  typeof questionnaireItemEnableWhenOperatorSchema
>
