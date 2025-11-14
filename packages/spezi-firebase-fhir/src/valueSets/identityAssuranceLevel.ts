//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The level of confidence that this link represents the same actual person.
 * http://hl7.org/fhir/valueset-identity-assuranceLevel.html
 */
export const identityAssuranceLevelSchema = z.enum([
  'level1',
  'level2',
  'level3',
  'level4',
])

/**
 * The level of confidence that this link represents the same actual person.
 * http://hl7.org/fhir/valueset-identity-assuranceLevel.html
 */
export type IdentityAssuranceLevel = z.infer<
  typeof identityAssuranceLevelSchema
>
