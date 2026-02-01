//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of a MedicationRequest.
 * http://hl7.org/fhir/valueset-medicationrequest-status.html
 */
export const medicationRequestStatusSchema = z.enum([
  'active',
  'on-hold',
  'cancelled',
  'completed',
  'entered-in-error',
  'stopped',
  'draft',
  'unknown',
])

/**
 * The status of a MedicationRequest.
 * http://hl7.org/fhir/valueset-medicationrequest-status.html
 */
export type MedicationRequestStatus = z.infer<
  typeof medicationRequestStatusSchema
>

/**
 * The kind of medication order.
 * http://hl7.org/fhir/valueset-medicationrequest-intent.html
 */
export const medicationRequestIntentSchema = z.enum([
  'proposal',
  'plan',
  'order',
  'original-order',
  'reflex-order',
  'filler-order',
  'instance-order',
  'option',
])

/**
 * The kind of medication order.
 * http://hl7.org/fhir/valueset-medicationrequest-intent.html
 */
export type MedicationRequestIntent = z.infer<
  typeof medicationRequestIntentSchema
>
