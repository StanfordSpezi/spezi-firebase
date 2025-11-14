//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the questionnaire response.
 * http://hl7.org/fhir/valueset-questionnaire-answers-status.html
 */
export const questionnaireResponseStatusSchema = z.enum([
  'in-progress',
  'completed',
  'amended',
  'entered-in-error',
])

/**
 * The status of the questionnaire response.
 * http://hl7.org/fhir/valueset-questionnaire-answers-status.html
 */
export type QuestionnaireResponseStatus = z.infer<
  typeof questionnaireResponseStatusSchema
>
