//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Current state of the encounter.
 */
export const encounterStatusSchema = z.enum([
  'planned',
  'arrived',
  'triaged',
  'in-progress',
  'onleave',
  'finished',
  'cancelled',
  'entered-in-error',
  'unknown',
])
