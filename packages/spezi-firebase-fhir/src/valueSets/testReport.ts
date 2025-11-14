//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR TestReportActionResult value set.
 * The result of executing a test action.
 */
export const testReportActionResultSchema = z.enum([
  'pass',
  'skip',
  'fail',
  'warning',
  'error',
])

/**
 * TypeScript type for FHIR TestReportActionResult value set.
 */
export type TestReportActionResult = z.infer<
  typeof testReportActionResultSchema
>

/**
 * Zod schema for FHIR TestReportParticipantType value set.
 * The type of participant in a test report.
 */
export const testReportParticipantTypeSchema = z.enum([
  'test-engine',
  'client',
  'server',
])

/**
 * TypeScript type for FHIR TestReportParticipantType value set.
 */
export type TestReportParticipantType = z.infer<
  typeof testReportParticipantTypeSchema
>

/**
 * Zod schema for FHIR TestReportResult value set.
 * The overall result of a test report.
 */
export const testReportResultSchema = z.enum(['pass', 'fail', 'pending'])

/**
 * TypeScript type for FHIR TestReportResult value set.
 */
export type TestReportResult = z.infer<typeof testReportResultSchema>

/**
 * Zod schema for FHIR TestReportStatus value set.
 * The current status of a test report.
 */
export const testReportStatusSchema = z.enum([
  'completed',
  'in-progress',
  'waiting',
  'stopped',
  'entered-in-error',
])

/**
 * TypeScript type for FHIR TestReportStatus value set.
 */
export type TestReportStatus = z.infer<typeof testReportStatusSchema>
