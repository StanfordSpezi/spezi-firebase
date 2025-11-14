//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The workflow state of a clinical impression.
 * http://hl7.org/fhir/valueset-clinicalimpression-status.html
 */
export const clinicalImpressionStatusSchema = z.enum([
  'in-progress',
  'completed',
  'entered-in-error',
])

/**
 * The workflow state of a clinical impression.
 * http://hl7.org/fhir/valueset-clinicalimpression-status.html
 */
export type ClinicalImpressionStatus = z.infer<
  typeof clinicalImpressionStatusSchema
>
