//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Timing } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { codeableConceptSchema } from './codeableConcept.js'
import { periodSchema } from './period.js'
import {
  codeSchema,
  dateTimeSchema,
  decimalSchema,
  positiveIntSchema,
  timeSchema,
} from './primitiveTypes.js'
import { quantitySchema } from './quantity.js'
import { rangeSchema } from './range.js'
import { backboneElementSchema } from '../backBoneElement.js'
import { elementSchema } from '../element.js'

const timingRepeatDayOfWeekSchema = z.enum([
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
])
export type TimingRepeatDayOfWeek = z.infer<typeof timingRepeatDayOfWeekSchema>

const timingRepeatTimeUnitSchema = z.enum([
  's',
  'min',
  'h',
  'd',
  'wk',
  'mo',
  'a',
])
export type TimingRepeatTimeUnit = z.infer<typeof timingRepeatTimeUnitSchema>

export const timingSchema: ZodType<Timing> = z.lazy(() =>
  backboneElementSchema.extend({
    event: dateTimeSchema.array().optional(),
    _event: elementSchema.array().optional(),
    repeat: elementSchema
      .extend({
        boundsDuration: quantitySchema.optional(),
        boundsRange: rangeSchema.optional(),
        boundsPeriod: periodSchema.optional(),
        count: positiveIntSchema.optional(),
        countMax: positiveIntSchema.optional(),
        duration: decimalSchema.optional(),
        durationMax: decimalSchema.optional(),
        durationUnit: timingRepeatTimeUnitSchema.optional(),
        _durationUnit: elementSchema.optional(),
        frequency: positiveIntSchema.optional(),
        frequencyMax: positiveIntSchema.optional(),
        period: decimalSchema.optional(),
        periodMax: decimalSchema.optional(),
        periodUnit: timingRepeatTimeUnitSchema.optional(),
        _periodUnit: elementSchema.optional(),
        dayOfWeek: timingRepeatDayOfWeekSchema.array().optional(),
        _dayOfWeek: elementSchema.array().optional(),
        timeOfDay: timeSchema.array().optional(),
        _timeOfDay: elementSchema.array().optional(),
        when: codeSchema.array().optional(),
        _when: elementSchema.array().optional(),
        offset: positiveIntSchema.optional(),
      })
      .optional(),
    code: codeableConceptSchema.optional(),
  }),
)
