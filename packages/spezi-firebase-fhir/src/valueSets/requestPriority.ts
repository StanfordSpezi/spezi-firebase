//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Identifies the level of importance to be assigned to actioning the request.
 * http://hl7.org/fhir/valueset-request-priority.html
 */
export const requestPrioritySchema = z.enum([
  'routine',
  'urgent',
  'asap',
  'stat',
])

/**
 * Identifies the level of importance to be assigned to actioning the request.
 * http://hl7.org/fhir/valueset-request-priority.html
 */
export type RequestPriority = z.infer<typeof requestPrioritySchema>
