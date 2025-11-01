//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Status of the supply request
 * http://hl7.org/fhir/valueset-supplyrequest-status.html
 */
export const supplyRequestStatusSchema = z.enum([
  'draft',
  'active',
  'suspended',
  'cancelled',
  'completed',
  'entered-in-error',
  'unknown',
])

export type SupplyRequestStatus = z.infer<typeof supplyRequestStatusSchema>
