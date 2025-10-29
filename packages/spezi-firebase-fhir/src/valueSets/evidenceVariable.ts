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
 * EvidenceVariable Handling
 * http://hl7.org/fhir/ValueSet/variable-handling
 */
export const evidenceVariableHandlingSchema = z.lazy(() =>
  codeSchema.pipe(
    z.enum(['continuous', 'dichotomous', 'ordinal', 'polychotomous']),
  ),
)

/**
 * Group Measure
 * http://hl7.org/fhir/ValueSet/group-measure
 */
export const groupMeasureSchema = z.lazy(() =>
  codeSchema.pipe(
    z.enum([
      'mean',
      'median',
      'mean-of-mean',
      'mean-of-median',
      'median-of-mean',
      'median-of-median',
    ]),
  ),
)
