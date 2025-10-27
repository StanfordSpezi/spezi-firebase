//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of a diagnostic report.
 * http://hl7.org/fhir/valueset-diagnostic-report-status.html
 */
export const diagnosticReportStatusSchema = z.enum([
  'registered',
  'partial',
  'preliminary',
  'final',
  'amended',
  'corrected',
  'appended',
  'cancelled',
  'entered-in-error',
  'unknown',
])

export type DiagnosticReportStatus = z.infer<
  typeof diagnosticReportStatusSchema
>
