//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The availability status of the specimen.
 * http://hl7.org/fhir/valueset-specimen-status.html
 */
export const specimenStatusSchema = z.enum([
  'available',
  'unavailable',
  'unsatisfactory',
  'entered-in-error',
])

/**
 * The availability status of the specimen.
 * http://hl7.org/fhir/valueset-specimen-status.html
 */
export type SpecimenStatus = z.infer<typeof specimenStatusSchema>
