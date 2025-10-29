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
 * ResearchSubject Status
 * http://hl7.org/fhir/ValueSet/research-subject-status
 */
export const researchSubjectStatusSchema = z.lazy(() =>
  codeSchema.pipe(
    z.enum([
      'candidate',
      'eligible',
      'follow-up',
      'ineligible',
      'not-registered',
      'off-study',
      'on-study',
      'on-study-intervention',
      'on-study-observation',
      'pending-on-study',
      'potential-candidate',
      'screening',
      'withdrawn',
    ]),
  ),
)
