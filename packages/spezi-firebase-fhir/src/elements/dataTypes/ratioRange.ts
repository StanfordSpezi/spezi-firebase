//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type RatioRange } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { quantitySchema } from './quantity.js'
import { elementSchema } from '../element.js'

/**
 * Zod schema for FHIR RatioRange data type.
 */
export const ratioRangeSchema: ZodType<RatioRange> = z.lazy(() =>
  elementSchema.extend({
    lowNumerator: quantitySchema.optional(),
    highNumerator: quantitySchema.optional(),
    denominator: quantitySchema.optional(),
  }),
)
