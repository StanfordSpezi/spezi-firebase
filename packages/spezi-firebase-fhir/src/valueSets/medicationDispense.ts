//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A code specifying the state of the dispense event.
 * http://hl7.org/fhir/valueset-medicationdispense-status.html
 */
export const medicationDispenseStatusSchema = z.enum([
  'preparation',
  'in-progress',
  'cancelled',
  'on-hold',
  'completed',
  'entered-in-error',
  'stopped',
  'declined',
  'unknown',
])

/**
 * A code specifying the state of the dispense event.
 * http://hl7.org/fhir/valueset-medicationdispense-status.html
 */
export type MedicationDispenseStatus = z.infer<
  typeof medicationDispenseStatusSchema
>
