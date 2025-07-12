//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../element.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { Period } from 'fhir/r4b.js'
import { z, ZodType } from 'zod/v4'

export const periodSchema: ZodType<Period> = z.lazy(() =>
  elementSchema.extend({
    start: dateTimeSchema.optional(),
    _start: elementSchema.optional(),
    end: dateTimeSchema.optional(),
    _end: elementSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof periodSchema, Period>
type _AssertFull = AssertOutputFull<typeof periodSchema, Period>
