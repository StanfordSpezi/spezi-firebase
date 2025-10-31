//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { codeSchema } from '../elements/index.js'

/**
 * EvidenceReport Type
 * http://hl7.org/fhir/ValueSet/evidence-report-type
 */
export const evidenceReportTypeSchema = z.lazy(() =>
  codeSchema.pipe(
    z.enum(['classification', 'search-results', 'text', 'resources-compiled']),
  ),
)

/**
 * Section Mode
 * http://hl7.org/fhir/ValueSet/list-mode
 */
export const sectionModeSchema = z.lazy(() =>
  codeSchema.pipe(z.enum(['working', 'snapshot', 'changes'])),
)

/**
 * EvidenceReport Relates To Code
 * http://hl7.org/fhir/ValueSet/evidence-report-relation-type
 */
export const evidenceReportRelatesToCodeSchema = z.lazy(() =>
  codeSchema.pipe(
    z.enum([
      'replaces',
      'amends',
      'appends',
      'transforms',
      'replacedWith',
      'amendedWith',
      'appendedWith',
      'transformedWith',
    ]),
  ),
)
