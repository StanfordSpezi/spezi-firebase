//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A coded concept defining if the medication is in active use.
 * http://hl7.org/fhir/valueset-medication-status.html
 */
export const medicationStatusSchema = z.enum([
  'active',
  'inactive',
  'entered-in-error',
])

export type MedicationStatus = z.infer<typeof medicationStatusSchema>
