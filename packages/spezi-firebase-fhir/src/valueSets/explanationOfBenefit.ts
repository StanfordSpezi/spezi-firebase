//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Zod schema for FHIR ExplanationOfBenefitUse value set.
 * Indicates whether the claim is for costs already incurred or a preauthorization/predetermination.
 */
export const explanationOfBenefitUseSchema = z.enum([
  'claim',
  'preauthorization',
  'predetermination',
])

/**
 * TypeScript type for FHIR ExplanationOfBenefitUse value set.
 */
export type ExplanationOfBenefitUse = z.infer<
  typeof explanationOfBenefitUseSchema
>
