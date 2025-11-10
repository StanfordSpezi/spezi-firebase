//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Whether a reference needs to be version specific or version independent, or whether either can be used.
 * http://hl7.org/fhir/valueset-reference-version-rules.html
 */
export const referenceVersionRulesSchema = z.enum([
  'either',
  'independent',
  'specific',
])

export type ReferenceVersionRules = z.infer<typeof referenceVersionRulesSchema>
