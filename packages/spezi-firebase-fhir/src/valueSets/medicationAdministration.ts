//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A code specifying the state of the medication administration.
 * http://hl7.org/fhir/valueset-medication-admin-status.html
 */
export const medicationAdministrationStatusSchema = z.enum([
  'in-progress',
  'not-done',
  'on-hold',
  'completed',
  'entered-in-error',
  'stopped',
  'unknown',
])

export type MedicationAdministrationStatus = z.infer<
  typeof medicationAdministrationStatusSchema
>
