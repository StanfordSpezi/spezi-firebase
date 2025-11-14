//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A code specifying the state of the procedure.
 * http://hl7.org/fhir/valueset-event-status.html
 */
export const procedureStatusSchema = z.enum([
  'preparation',
  'in-progress',
  'not-done',
  'on-hold',
  'stopped',
  'completed',
  'entered-in-error',
  'unknown',
])

/**
 * A code specifying the state of the procedure.
 * http://hl7.org/fhir/valueset-event-status.html
 */
export type ProcedureStatus = z.infer<typeof procedureStatusSchema>
