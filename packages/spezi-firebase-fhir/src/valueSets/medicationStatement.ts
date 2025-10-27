//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A code specifying the state of the medication statement.
 * http://hl7.org/fhir/valueset-medication-statement-status.html
 */
export const medicationStatementStatusSchema = z.enum([
  'active',
  'completed',
  'entered-in-error',
  'intended',
  'stopped',
  'on-hold',
  'unknown',
])

export type MedicationStatementStatus = z.infer<
  typeof medicationStatementStatusSchema
>
