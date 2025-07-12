//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { backboneElementSchema } from '../backBoneElement.js'
import {
  codeSchema,
  positiveIntSchema,
  timeSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { periodSchema } from './period.js'
import { z, ZodType } from 'zod/v4'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { quantitySchema } from './quantity.js'
import { rangeSchema } from './range.js'
import { codeableConceptSchema } from './codeableConcept.js'
import { Timing } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

const dayOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
const timeUnit = ['s', 'min', 'h', 'd', 'wk', 'mo', 'a'] as const

export const timingSchema: ZodType<Timing> = z.lazy(() =>
  backboneElementSchema.extend({
    event: dateTimeSchema.array().optional(),
    repeat: z
      .object({
        boundsDuration: quantitySchema.optional(),
        boundsRange: rangeSchema.optional(),
        boundsPeriod: periodSchema.optional(),
        count: positiveIntSchema.optional(),
        countMax: positiveIntSchema.optional(),
        duration: z.number().optional(),
        durationMax: z.number().optional(),
        durationUnit: z.enum(timeUnit).optional(),
        frequency: positiveIntSchema.optional(),
        frequencyMax: positiveIntSchema.optional(),
        period: z.number().optional(),
        periodMax: z.number().optional(),
        periodUnit: z.enum(timeUnit).optional(),
        dayOfWeek: z.enum(dayOfWeek).array().optional(),
        timeOfDay: timeSchema.array().optional(),
        when: codeSchema.array().optional(),
        offset: positiveIntSchema.optional(),
      })
      .optional(),
    code: codeableConceptSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof timingSchema, Timing>
type _AssertFull = AssertOutputFull<typeof timingSchema, Timing>
