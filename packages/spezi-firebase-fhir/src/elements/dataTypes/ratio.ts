//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Ratio } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { quantitySchema } from './quantity.js'
import { elementSchema } from '../element.js'

export const ratioSchema: ZodType<Ratio> = z.lazy(() =>
  elementSchema.extend({
    numerator: quantitySchema.optional(),
    denominator: quantitySchema.optional(),
  }),
)
