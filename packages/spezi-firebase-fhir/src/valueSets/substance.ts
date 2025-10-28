//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A coded concept defining if the substance is active or inactive.
 * http://hl7.org/fhir/valueset-substance-status.html
 */
export const substanceStatusSchema = z.enum([
  'active',
  'inactive',
  'entered-in-error',
])

export type SubstanceStatus = z.infer<typeof substanceStatusSchema>
