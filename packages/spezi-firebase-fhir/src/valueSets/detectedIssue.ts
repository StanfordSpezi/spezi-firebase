//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Indicates the potential degree of impact of the identified issue on the patient.
 * http://hl7.org/fhir/valueset-detectedissue-severity.html
 */
export const detectedIssueSeveritySchema = z.enum(['high', 'moderate', 'low'])

export type DetectedIssueSeverity = z.infer<typeof detectedIssueSeveritySchema>

/**
 * Codes providing the status of a detected issue.
 * http://hl7.org/fhir/valueset-observation-status.html
 */
export const detectedIssueStatusSchema = z.enum([
  'registered',
  'preliminary',
  'final',
  'amended',
  'corrected',
  'cancelled',
  'entered-in-error',
  'unknown',
])

export type DetectedIssueStatus = z.infer<typeof detectedIssueStatusSchema>
