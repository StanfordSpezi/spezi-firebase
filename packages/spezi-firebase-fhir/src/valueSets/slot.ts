//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of a slot.
 * http://hl7.org/fhir/valueset-slotstatus.html
 */
export const slotStatusSchema = z.enum([
  'busy',
  'free',
  'busy-unavailable',
  'busy-tentative',
  'entered-in-error',
])

export type SlotStatus = z.infer<typeof slotStatusSchema>
