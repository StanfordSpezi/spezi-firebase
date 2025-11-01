//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Status of the supply delivery
 * http://hl7.org/fhir/valueset-supplydelivery-status.html
 */
export const supplyDeliveryStatusSchema = z.enum([
  'in-progress',
  'completed',
  'abandoned',
  'entered-in-error',
])

export type SupplyDeliveryStatus = z.infer<typeof supplyDeliveryStatusSchema>
