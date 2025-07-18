//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SampledData } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { quantitySchema } from './quantity.js'
import { elementSchema } from '../element.js'
import { positiveIntSchema } from '../primitiveTypes/primitiveTypes.js'

export const sampledDataSchema: ZodType<SampledData> = z.lazy(() =>
  elementSchema.extend({
    origin: quantitySchema,
    period: z.number().positive(),
    factor: z.number().optional(),
    lowerLimit: z.number().optional(),
    upperLimit: z.number().optional(),
    dimensions: positiveIntSchema,
    data: z.string().optional(),
    _data: elementSchema.optional(),
  }),
)
