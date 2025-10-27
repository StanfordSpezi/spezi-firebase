//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the endpoint.
 * http://hl7.org/fhir/valueset-endpoint-status.html
 */
export const endpointStatusSchema = z.enum([
  'active',
  'suspended',
  'error',
  'off',
  'entered-in-error',
  'test',
])

export type EndpointStatus = z.infer<typeof endpointStatusSchema>
