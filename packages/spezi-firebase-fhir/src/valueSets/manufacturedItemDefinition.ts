//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Allows filtering of manufactured items that are appropriate for use versus not.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export const manufacturedItemDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

/**
 * Allows filtering of manufactured items that are appropriate for use versus not.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export type ManufacturedItemDefinitionStatus = z.infer<
  typeof manufacturedItemDefinitionStatusSchema
>
