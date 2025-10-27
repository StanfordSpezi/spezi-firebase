//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The priority of the request.
 * @see http://hl7.org/fhir/valueset-request-priority.html
 */
export const requestPrioritySchema = z.enum([
  'routine',
  'urgent',
  'asap',
  'stat',
])
