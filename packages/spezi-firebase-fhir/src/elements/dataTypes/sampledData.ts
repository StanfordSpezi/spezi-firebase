//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { elementSchema } from '../element.js'
import { positiveIntSchema } from '../primitiveTypes/primitiveTypes.js'
import { quantitySchema } from './quantity.js'
import { SampledData } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

export const sampledDataSchema = elementSchema.extend({
  origin: quantitySchema,
  period: z.number().positive(),
  factor: z.number().optional(),
  lowerLimit: z.number().optional(),
  upperLimit: z.number().optional(),
  dimensions: positiveIntSchema,
  data: z.string().optional(),
})

type _Assert = AssertOutput<typeof sampledDataSchema, SampledData>
type _AssertFull = AssertOutputFull<typeof sampledDataSchema, SampledData>
