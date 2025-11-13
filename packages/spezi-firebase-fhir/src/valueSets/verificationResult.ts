//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The validation status of the target.
 * http://hl7.org/fhir/valueset-verificationresult-status.html
 */
export const verificationResultStatusSchema = z.enum([
  'attested',
  'validated',
  'in-process',
  'req-revalid',
  'val-fail',
  'reval-fail',
])

/**
 * The validation status of the target.
 * http://hl7.org/fhir/valueset-verificationresult-status.html
 */
export type VerificationResultStatus = z.infer<
  typeof verificationResultStatusSchema
>
