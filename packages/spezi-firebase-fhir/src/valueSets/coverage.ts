//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the coverage.
 * http://hl7.org/fhir/valueset-fm-status.html
 */
export const coverageStatusSchema = z.enum([
  'active',
  'cancelled',
  'draft',
  'entered-in-error',
])

export type CoverageStatus = z.infer<typeof coverageStatusSchema>
