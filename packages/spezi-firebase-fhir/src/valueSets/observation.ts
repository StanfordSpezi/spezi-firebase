//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Codes providing the status of an observation.
 * http://hl7.org/fhir/valueset-observation-status.html
 */
export const observationStatusSchema = z.enum([
  'registered',
  'preliminary',
  'final',
  'amended',
  'corrected',
  'cancelled',
  'entered-in-error',
  'unknown',
])

/**
 * Codes providing the status of an observation.
 * http://hl7.org/fhir/valueset-observation-status.html
 */
export type ObservationStatus = z.infer<typeof observationStatusSchema>
