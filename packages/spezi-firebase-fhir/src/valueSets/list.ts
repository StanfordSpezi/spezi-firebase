//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The current state of the list.
 * http://hl7.org/fhir/valueset-list-status.html
 */
export const listStatusSchema = z.enum([
  'current',
  'retired',
  'entered-in-error',
])

export type ListStatus = z.infer<typeof listStatusSchema>

/**
 * The processing mode that applies to this list.
 * http://hl7.org/fhir/valueset-list-mode.html
 */
export const listModeSchema = z.enum(['working', 'snapshot', 'changes'])

export type ListMode = z.infer<typeof listModeSchema>
