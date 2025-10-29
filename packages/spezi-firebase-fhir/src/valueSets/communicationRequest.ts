//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the communication request.
 * http://hl7.org/fhir/valueset-request-status.html
 */
export const communicationRequestStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

export type CommunicationRequestStatus = z.infer<
  typeof communicationRequestStatusSchema
>
