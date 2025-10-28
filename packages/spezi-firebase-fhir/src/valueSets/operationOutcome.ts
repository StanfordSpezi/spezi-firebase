//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * How the issue affects the success of the action.
 * http://hl7.org/fhir/valueset-issue-severity.html
 */
export const issueSeveritySchema = z.enum([
  'fatal',
  'error',
  'warning',
  'information',
])

export type IssueSeverity = z.infer<typeof issueSeveritySchema>

/**
 * A code that describes the type of issue.
 * http://hl7.org/fhir/valueset-issue-type.html
 */
export const issueTypeSchema = z.enum([
  'invalid',
  'structure',
  'required',
  'value',
  'invariant',
  'security',
  'login',
  'unknown',
  'expired',
  'forbidden',
  'suppressed',
  'processing',
  'not-supported',
  'duplicate',
  'multiple-matches',
  'not-found',
  'deleted',
  'too-long',
  'code-invalid',
  'extension',
  'too-costly',
  'business-rule',
  'conflict',
  'transient',
  'lock-error',
  'no-store',
  'exception',
  'timeout',
  'throttled',
  'informational',
])

export type IssueType = z.infer<typeof issueTypeSchema>
