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
export const coverageStatusSchema = z.enum([
  'active',
  'cancelled',
  'draft',
  'entered-in-error',
])
