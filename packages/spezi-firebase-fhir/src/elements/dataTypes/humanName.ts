//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { elementSchema } from '../element.js'
import { z } from 'zod/v4'
import { periodSchema } from './period.js'
import { HumanName } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

const humanNameUse = [
  'usual',
  'official',
  'temp',
  'nickname',
  'anonymous',
  'old',
  'maiden',
] as const

export const humanNameSchema = elementSchema.extend({
  use: z.enum(humanNameUse).optional(),
  text: z.string().optional(),
  family: z.string().optional(),
  given: z.string().array().optional(),
  prefix: z.string().array().optional(),
  suffix: z.string().array().optional(),
  period: periodSchema.optional(),
})

type _Assert = AssertOutput<typeof humanNameSchema, HumanName>
type _AssertFull = AssertOutputFull<typeof humanNameSchema, HumanName>
