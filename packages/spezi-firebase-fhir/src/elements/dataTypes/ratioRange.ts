//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { RatioRange } from 'fhir/r4b.js'
import { elementSchema } from '../element.js'
import { quantitySchema } from './quantity.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { z, ZodType } from 'zod/v4'

export const ratioRangeSchema: ZodType<RatioRange> = z.lazy(() =>
  elementSchema.extend({
    lowNumerator: quantitySchema.optional(),
    _lowNumerator: elementSchema.optional(),
    highNumerator: quantitySchema.optional(),
    _highNumerator: elementSchema.optional(),
    denominator: quantitySchema.optional(),
    _denominator: elementSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof ratioRangeSchema, RatioRange>
type _AssertFull = AssertOutputFull<typeof ratioRangeSchema, RatioRange>
