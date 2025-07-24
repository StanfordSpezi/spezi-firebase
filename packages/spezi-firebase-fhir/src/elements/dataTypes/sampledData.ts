//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SampledData } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import {
  decimalSchema,
  positiveDecimalSchema,
  positiveIntSchema,
  stringSchema,
} from './primitiveTypes.js'
import { quantitySchema } from './quantity.js'
import { elementSchema } from '../element.js'

export const sampledDataSchema: ZodType<SampledData> = z.lazy(() =>
  elementSchema.extend({
    origin: quantitySchema,
    period: positiveDecimalSchema,
    factor: decimalSchema.optional(),
    lowerLimit: decimalSchema.optional(),
    upperLimit: decimalSchema.optional(),
    dimensions: positiveIntSchema,
    data: stringSchema.optional(),
    _data: elementSchema.optional(),
  }),
)
