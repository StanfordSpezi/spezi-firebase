//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Distinguishes which item is "source of truth" (if any) and which items are no longer considered to be current representations.
 * http://hl7.org/fhir/valueset-linkage-type.html
 */
export const linkageItemTypeSchema = z.enum([
  'source',
  'alternate',
  'historical',
])

export type LinkageItemType = z.infer<typeof linkageItemTypeSchema>
