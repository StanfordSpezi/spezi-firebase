//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Status of administrable product definition.
 * http://hl7.org/fhir/valueset-publication-status.html
 */
export const administrableProductDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export type AdministrableProductDefinitionStatus = z.infer<
  typeof administrableProductDefinitionStatusSchema
>
