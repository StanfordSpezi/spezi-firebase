//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the ImagingStudy.
 * http://hl7.org/fhir/valueset-imagingstudy-status.html
 */
export const imagingStudyStatusSchema = z.enum([
  'registered',
  'available',
  'cancelled',
  'entered-in-error',
  'unknown',
])

export type ImagingStudyStatus = z.infer<typeof imagingStudyStatusSchema>
