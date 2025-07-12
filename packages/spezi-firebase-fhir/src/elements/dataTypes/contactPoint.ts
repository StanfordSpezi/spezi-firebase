//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { positiveIntSchema } from '../primitiveTypes/primitiveTypes.js'
import { z, ZodType } from 'zod/v4'
import { ContactPoint } from 'fhir/r4b.js'
import { elementSchema } from '../element.js'
import { periodSchema } from './period.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

const contactPointSystem = [
  'phone',
  'fax',
  'email',
  'pager',
  'url',
  'sms',
  'other',
] as const

const contactPointUse = ['home', 'work', 'temp', 'old', 'mobile'] as const

export const contactPointSchema: ZodType<ContactPoint> = z.lazy(() =>
  elementSchema.extend({
    system: z.enum(contactPointSystem).optional(),
    value: z.string().optional(),
    use: z.enum(contactPointUse).optional(),
    rank: positiveIntSchema.optional(),
    period: periodSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof contactPointSchema, ContactPoint>
type _AssertFull = AssertOutputFull<typeof contactPointSchema, ContactPoint>
