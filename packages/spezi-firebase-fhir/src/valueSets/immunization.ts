//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the immunization event.
 * http://hl7.org/fhir/valueset-immunization-status.html
 */
export const immunizationStatusSchema = z.enum([
  'completed',
  'entered-in-error',
  'not-done',
])

export type ImmunizationStatus = z.infer<typeof immunizationStatusSchema>
