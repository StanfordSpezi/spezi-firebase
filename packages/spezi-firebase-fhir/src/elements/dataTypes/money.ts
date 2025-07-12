//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Money } from 'fhir/r4b.js'
import { elementSchema } from '../element.js'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import { z, ZodType } from 'zod/v4'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

export const moneySchema: ZodType<Money> = z.lazy(() =>
  elementSchema.extend({
    value: z.number().optional(),
    currency: codeSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof moneySchema, Money>
type _AssertFull = AssertOutputFull<typeof moneySchema, Money>
