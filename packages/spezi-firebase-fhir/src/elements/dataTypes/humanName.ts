//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type HumanName } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { periodSchema } from './period.js'
import { elementSchema } from '../element.js'

const humanNameUse = [
  'usual',
  'official',
  'temp',
  'nickname',
  'anonymous',
  'old',
  'maiden',
] as const

export const humanNameSchema: ZodType<HumanName> = z.lazy(() =>
  elementSchema.extend({
    use: z.enum(humanNameUse).optional(),
    _use: elementSchema.optional(),
    text: z.string().optional(),
    _text: elementSchema.optional(),
    family: z.string().optional(),
    _family: elementSchema.optional(),
    given: z.string().array().optional(),
    _given: elementSchema.array().optional(),
    prefix: z.string().array().optional(),
    _prefix: elementSchema.array().optional(),
    suffix: z.string().array().optional(),
    _suffix: elementSchema.array().optional(),
    period: periodSchema.optional(),
  }),
)
