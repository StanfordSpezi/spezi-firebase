//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the device request.
 * http://hl7.org/fhir/valueset-request-status.html
 */
export const deviceRequestStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

/**
 * The status of the device request.
 * http://hl7.org/fhir/valueset-request-status.html
 */
export type DeviceRequestStatus = z.infer<typeof deviceRequestStatusSchema>

/**
 * The kind of device request.
 * http://hl7.org/fhir/valueset-request-intent.html
 */
export const deviceRequestIntentSchema = z.enum([
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

/**
 * The kind of device request.
 * http://hl7.org/fhir/valueset-request-intent.html
 */
export type DeviceRequestIntent = z.infer<typeof deviceRequestIntentSchema>
