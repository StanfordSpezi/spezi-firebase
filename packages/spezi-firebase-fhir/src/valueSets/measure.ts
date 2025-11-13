//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The scoring type of the measure.
 * http://hl7.org/fhir/valueset-measure-scoring.html
 */
export const measureScoringSchema = z.enum([
  'proportion',
  'ratio',
  'continuous-variable',
  'cohort',
])

/**
 * The scoring type of the measure.
 * http://hl7.org/fhir/valueset-measure-scoring.html
 */
export type MeasureScoring = z.infer<typeof measureScoringSchema>

/**
 * The type of measure (includes codes from 2.16.840.1.113883.1.11.20368).
 * http://hl7.org/fhir/valueset-measure-type.html
 */
export const measureTypeSchema = z.enum([
  'process',
  'outcome',
  'structure',
  'patient-reported-outcome',
  'composite',
])

/**
 * The type of measure (includes codes from 2.16.840.1.113883.1.11.20368).
 * http://hl7.org/fhir/valueset-measure-type.html
 */
export type MeasureType = z.infer<typeof measureTypeSchema>

/**
 * The status of the measure report.
 * http://hl7.org/fhir/valueset-measure-report-status.html
 */
export const measureReportStatusSchema = z.enum([
  'complete',
  'pending',
  'error',
])

/**
 * The status of the measure report.
 * http://hl7.org/fhir/valueset-measure-report-status.html
 */
export type MeasureReportStatus = z.infer<typeof measureReportStatusSchema>

/**
 * The type of the measure report.
 * http://hl7.org/fhir/valueset-measure-report-type.html
 */
export const measureReportTypeSchema = z.enum([
  'individual',
  'subject-list',
  'summary',
  'data-collection',
])

/**
 * The type of the measure report.
 * http://hl7.org/fhir/valueset-measure-report-type.html
 */
export type MeasureReportType = z.infer<typeof measureReportTypeSchema>
