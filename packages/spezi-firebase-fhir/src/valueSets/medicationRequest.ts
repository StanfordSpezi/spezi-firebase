//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A code specifying the state of the resource instance.
 */
export const medicationRequestStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'completed',
  'entered-in-error',
  'stopped',
  'cancelled',
  'unknown',
])

/**
 * The kind of medication order.
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
