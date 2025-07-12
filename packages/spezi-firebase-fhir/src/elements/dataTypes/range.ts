//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Range } from 'fhir/r4b.js'
import { elementSchema } from '../element.js'
import { quantitySchema } from './quantity.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { z, ZodType } from 'zod/v4'

export const rangeSchema: ZodType<Range> = z.lazy(() =>
  elementSchema.extend({
    low: quantitySchema.optional(),
    _low: elementSchema.optional(),
    high: quantitySchema.optional(),
    _high: elementSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof rangeSchema, Range>
type _AssertFull = AssertOutputFull<typeof rangeSchema, Range>
