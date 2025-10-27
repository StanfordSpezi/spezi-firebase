//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The gender of a person used for administrative purposes.
 * http://hl7.org/fhir/valueset-administrative-gender.html
 */
export const administrativeGenderSchema = z.enum([
  'male',
  'female',
  'other',
  'unknown',
])

export type AdministrativeGender = z.infer<typeof administrativeGenderSchema>
