//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Indicates the status of the care team.
 * http://hl7.org/fhir/valueset-care-team-status.html
 */
export const careTeamStatusSchema = z.enum([
  'proposed',
  'active',
  'suspended',
  'inactive',
  'entered-in-error',
])

export type CareTeamStatus = z.infer<typeof careTeamStatusSchema>
