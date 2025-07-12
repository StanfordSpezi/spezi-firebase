//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Ratio } from 'fhir/r4b.js'
import { elementSchema } from '../element.js'
import { quantitySchema } from './quantity.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { z, ZodType } from 'zod/v4'

export const ratioSchema: ZodType<Ratio> = z.lazy(() =>
  elementSchema.extend({
    numerator: quantitySchema.optional(),
    _numerator: elementSchema.optional(),
    denominator: quantitySchema.optional(),
    _denominator: elementSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof ratioSchema, Ratio>
type _AssertFull = AssertOutputFull<typeof ratioSchema, Ratio>
