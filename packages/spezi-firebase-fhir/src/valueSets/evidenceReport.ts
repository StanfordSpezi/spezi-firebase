//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * EvidenceReport Type
 * http://hl7.org/fhir/ValueSet/evidence-report-type
 */
export const evidenceReportTypeSchema = z.enum([
  'classification',
  'search-results',
  'text',
  'resources-compiled',
])

/**
 * EvidenceReport Type
 * http://hl7.org/fhir/ValueSet/evidence-report-type
 */
export type EvidenceReportType = z.infer<typeof evidenceReportTypeSchema>

/**
 * Section Mode
 * http://hl7.org/fhir/ValueSet/list-mode
 */
export const sectionModeSchema = z.enum(['working', 'snapshot', 'changes'])

/**
 * Section Mode
 * http://hl7.org/fhir/ValueSet/list-mode
 */
export type SectionMode = z.infer<typeof sectionModeSchema>

/**
 * EvidenceReport Relates To Code
 * http://hl7.org/fhir/ValueSet/evidence-report-relation-type
 */
export const evidenceReportRelatesToCodeSchema = z.enum([
  'replaces',
  'amends',
  'appends',
  'transforms',
  'replacedWith',
  'amendedWith',
  'appendedWith',
  'transformedWith',
])

/**
 * EvidenceReport Relates To Code
 * http://hl7.org/fhir/ValueSet/evidence-report-relation-type
 */
export type EvidenceReportRelatesToCode = z.infer<
  typeof evidenceReportRelatesToCodeSchema
>
