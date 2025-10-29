//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Indicates whether the plan is currently being acted upon, represents future intentions or is now a historical record.
 * http://hl7.org/fhir/valueset-care-plan-status.html
 */
export const carePlanStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

export type CarePlanStatus = z.infer<typeof carePlanStatusSchema>

/**
 * Codes indicating the degree of authority/intentionality associated with a care plan.
 * http://hl7.org/fhir/valueset-care-plan-intent.html
 */
export const carePlanIntentSchema = z.enum([
  'proposal',
  'plan',
  'order',
  'option',
])

export type CarePlanIntent = z.infer<typeof carePlanIntentSchema>

/**
 * Codes that reflect the current state of a care plan activity within its overall life cycle.
 * http://hl7.org/fhir/valueset-care-plan-activity-status.html
 */
export const carePlanActivityStatusSchema = z.enum([
  'not-started',
  'scheduled',
  'in-progress',
  'on-hold',
  'completed',
  'cancelled',
  'stopped',
  'unknown',
  'entered-in-error',
])

export type CarePlanActivityStatus = z.infer<
  typeof carePlanActivityStatusSchema
>
