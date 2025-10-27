//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of a service order.
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

/**
 * The kind of service request.
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
