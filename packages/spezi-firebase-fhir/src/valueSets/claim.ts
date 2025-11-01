//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The purpose of the Claim: predetermination, preauthorization, claim.
 * http://hl7.org/fhir/valueset-claim-use.html
 */
export const claimUseSchema = z.enum([
  'claim',
  'preauthorization',
  'predetermination',
])

export type ClaimUse = z.infer<typeof claimUseSchema>
