//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ContactPoint } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { periodSchema } from './period.js'
import { elementSchema } from '../element.js'
import { positiveIntSchema } from '../primitiveTypes/primitiveTypes.js'

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
    _system: elementSchema.optional(),
    value: z.string().optional(),
    _value: elementSchema.optional(),
    use: z.enum(contactPointUse).optional(),
    _use: elementSchema.optional(),
    rank: positiveIntSchema.optional(),
    period: periodSchema.optional(),
  }),
)
