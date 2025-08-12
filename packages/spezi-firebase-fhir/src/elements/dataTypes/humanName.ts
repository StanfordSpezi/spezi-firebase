//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type HumanName } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { periodSchema } from './period.js'
import { stringSchema } from './primitiveTypes.js'
import { elementSchema } from '../element.js'

const humanNameUseSchema = z.enum([
  'usual',
  'official',
  'temp',
  'nickname',
  'anonymous',
  'old',
  'maiden',
])

export const humanNameSchema: ZodType<HumanName> = z.lazy(() =>
  elementSchema.extend({
    use: humanNameUseSchema.optional(),
    _use: elementSchema.optional(),
    text: stringSchema.optional(),
    _text: elementSchema.optional(),
    family: stringSchema.optional(),
    _family: elementSchema.optional(),
    given: stringSchema.array().optional(),
    _given: elementSchema.array().optional(),
    prefix: stringSchema.array().optional(),
    _prefix: elementSchema.array().optional(),
    suffix: stringSchema.array().optional(),
    _suffix: elementSchema.array().optional(),
    period: periodSchema.optional(),
  }),
)
