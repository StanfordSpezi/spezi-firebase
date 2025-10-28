//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The workflow/clinical status of the catalog entry.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export const catalogEntryStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export type CatalogEntryStatus = z.infer<typeof catalogEntryStatusSchema>

/**
 * The type of relation between catalog entries.
 * http://hl7.org/fhir/valueset-relation-type.html
 */
export const catalogEntryRelationtypeSchema = z.enum([
  'triggers',
  'is-replaced-by',
])

export type CatalogEntryRelationtype = z.infer<
  typeof catalogEntryRelationtypeSchema
>
