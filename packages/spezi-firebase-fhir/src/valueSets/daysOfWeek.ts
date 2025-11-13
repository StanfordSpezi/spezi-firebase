//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The days of the week.
 * http://hl7.org/fhir/valueset-days-of-week.html
 */
export const daysOfWeekSchema = z.enum([
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
])

/**
 * The days of the week.
 * http://hl7.org/fhir/valueset-days-of-week.html
 */
export type DaysOfWeek = z.infer<typeof daysOfWeekSchema>
