//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Range } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { quantitySchema } from './quantity.js'
import { elementSchema } from '../element.js'

export const rangeSchema: ZodType<Range> = z.lazy(() =>
  elementSchema.extend({
    low: quantitySchema.optional(),
    high: quantitySchema.optional(),
  }),
)
