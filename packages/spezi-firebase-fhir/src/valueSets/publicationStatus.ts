//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The lifecycle status of an artifact.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export const publicationStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export type PublicationStatus = z.infer<typeof publicationStatusSchema>
