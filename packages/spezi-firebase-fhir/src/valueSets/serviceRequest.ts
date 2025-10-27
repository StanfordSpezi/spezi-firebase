//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of a service request.
 * http://hl7.org/fhir/valueset-request-status.html
 */
export const serviceRequestStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

export type ServiceRequestStatus = z.infer<typeof serviceRequestStatusSchema>

/**
 * The kind of service request.
 * http://hl7.org/fhir/valueset-request-intent.html
 */
export const serviceRequestIntentSchema = z.enum([
  'proposal',
  'plan',
  'directive',
  'order',
  'original-order',
  'reflex-order',
  'filler-order',
  'instance-order',
  'option',
])

export type ServiceRequestIntent = z.infer<typeof serviceRequestIntentSchema>
