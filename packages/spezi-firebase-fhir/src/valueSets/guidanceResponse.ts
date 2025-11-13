//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the guidance response.
 * http://hl7.org/fhir/valueset-guidance-response-status.html
 */
export const guidanceResponseStatusSchema = z.enum([
  'success',
  'data-requested',
  'data-required',
  'in-progress',
  'failure',
  'entered-in-error',
])

/**
 * The status of the guidance response.
 * http://hl7.org/fhir/valueset-guidance-response-status.html
 */
export type GuidanceResponseStatus = z.infer<
  typeof guidanceResponseStatusSchema
>
