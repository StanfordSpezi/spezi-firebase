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
import { positiveIntSchema, stringSchema } from './primitiveTypes.js'
import { elementSchema } from '../element.js'

export const contactPointSystemSchema = z.enum([
  'phone',
  'fax',
  'email',
  'pager',
  'url',
  'sms',
  'other',
])
export type ContactPointSystem = z.infer<typeof contactPointSystemSchema>

export const contactPointUseSchema = z.enum([
  'home',
  'work',
  'temp',
  'old',
  'mobile',
])
export type ContactPointUse = z.infer<typeof contactPointUseSchema>

export const contactPointSchema: ZodType<ContactPoint> = z.lazy(() =>
  elementSchema.extend({
    system: contactPointSystemSchema.optional(),
    _system: elementSchema.optional(),
    value: stringSchema.optional(),
    _value: elementSchema.optional(),
    use: contactPointUseSchema.optional(),
    _use: elementSchema.optional(),
    rank: positiveIntSchema.optional(),
    period: periodSchema.optional(),
  }),
)
