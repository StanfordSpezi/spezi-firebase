//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A code that identifies the status of the family history record.
 * http://hl7.org/fhir/valueset-history-status.html
 */
export const familyMemberHistoryStatusSchema = z.enum([
  'partial',
  'completed',
  'entered-in-error',
  'health-unknown',
])

export type FamilyMemberHistoryStatus = z.infer<
  typeof familyMemberHistoryStatusSchema
>
