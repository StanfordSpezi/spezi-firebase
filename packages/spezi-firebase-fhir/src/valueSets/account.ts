//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Indicates whether the account is presently used/usable or not.
 * http://hl7.org/fhir/valueset-account-status.html
 */
export const accountStatusSchema = z.enum([
  'active',
  'inactive',
  'entered-in-error',
  'on-hold',
  'unknown',
])

export type AccountStatus = z.infer<typeof accountStatusSchema>
