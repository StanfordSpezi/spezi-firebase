//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of an episode of care.
 * http://hl7.org/fhir/valueset-episode-of-care-status.html
 */
export const episodeOfCareStatusSchema = z.enum([
  'planned',
  'waitlist',
  'active',
  'onhold',
  'finished',
  'cancelled',
  'entered-in-error',
])

export type EpisodeOfCareStatus = z.infer<typeof episodeOfCareStatusSchema>
