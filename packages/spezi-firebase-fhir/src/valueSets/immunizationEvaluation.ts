//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the immunization evaluation.
 * http://hl7.org/fhir/valueset-immunization-evaluation-status.html
 */
export const immunizationEvaluationStatusSchema = z.enum([
  'completed',
  'entered-in-error',
])

/**
 * The status of the immunization evaluation.
 * http://hl7.org/fhir/valueset-immunization-evaluation-status.html
 */
export type ImmunizationEvaluationStatus = z.infer<
  typeof immunizationEvaluationStatusSchema
>
