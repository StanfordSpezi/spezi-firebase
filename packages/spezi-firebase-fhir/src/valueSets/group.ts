//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Types of resources that are part of group.
 * http://hl7.org/fhir/valueset-group-type.html
 */
export const groupTypeSchema = z.enum([
  'person',
  'animal',
  'practitioner',
  'device',
  'medication',
  'substance',
])

export type GroupType = z.infer<typeof groupTypeSchema>
