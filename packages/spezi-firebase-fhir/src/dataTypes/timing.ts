//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  backBoneElementBackwardSchema,
  backBoneElementForwardSchema,
} from '../elements/backBoneElement.js'
import {
  codeSchema,
  positiveIntSchema,
  timeSchema,
} from '../primitiveTypes/primitiveTypes.js'
import {
  elementForwardSchema,
  elementBackwardSchema,
} from '../elements/element.js'
import { periodBackwardSchema, periodForwardSchema } from './period.js'
import { z } from 'zod/v4'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { quantityBackwardSchema, quantityForwardSchema } from './quantity.js'
import { rangeBackwardSchema, rangeForwardSchema } from './range.js'
import {
  codeableConceptBackwardSchema,
  codeableConceptForwardSchema,
} from './codeableConcept.js'

export const timingRepeatForwardSchema = elementForwardSchema.extend({
  get boundsDuration() {
    return quantityForwardSchema.optional()
  },
  get boundsRange() {
    return rangeForwardSchema.optional()
  },
  get boundsPeriod() {
    return periodForwardSchema.optional()
  },
  get count() {
    return positiveIntSchema.forward.optional()
  },
  get countMax() {
    return positiveIntSchema.forward.optional()
  },
  get duration() {
    return z.number().optional()
  },
  get durationMax() {
    return z.number().optional()
  },
  get durationUnit() {
    return codeSchema.forward.optional()
  },
  get frequency() {
    return positiveIntSchema.forward.optional()
  },
  get frequencyMax() {
    return positiveIntSchema.forward.optional()
  },
  get period() {
    return z.number().optional()
  },
  get periodMax() {
    return z.number().optional()
  },
  get periodUnit() {
    return codeSchema.forward.optional()
  },
  get dayOfWeek() {
    return codeSchema.forward.array().optional()
  },
  get timeOfDay() {
    return timeSchema.forward.array().optional()
  },
  get when() {
    return codeSchema.forward.array().optional()
  },
  get offset() {
    return positiveIntSchema.forward.optional()
  },
})

export const timingForwardSchema = backBoneElementForwardSchema.extend({
  get event() {
    return dateTimeSchema.forward.array().optional()
  },
  get repeat() {
    return timingRepeatForwardSchema.optional()
  },
  get code() {
    return codeableConceptForwardSchema.optional()
  },
})

export const timingRepeatBackwardSchema = elementBackwardSchema.extend({
  get boundsDuration() {
    return quantityBackwardSchema.optional()
  },
  get boundsRange() {
    return rangeBackwardSchema.optional()
  },
  get boundsPeriod() {
    return periodBackwardSchema.optional()
  },
  get count() {
    return positiveIntSchema.backward.optional()
  },
  get countMax() {
    return positiveIntSchema.backward.optional()
  },
  get duration() {
    return z.number().optional()
  },
  get durationMax() {
    return z.number().optional()
  },
  get durationUnit() {
    return codeSchema.backward.optional()
  },
  get frequency() {
    return positiveIntSchema.backward.optional()
  },
  get frequencyMax() {
    return positiveIntSchema.backward.optional()
  },
  get period() {
    return z.number().optional()
  },
  get periodMax() {
    return z.number().optional()
  },
  get periodUnit() {
    return codeSchema.backward.optional()
  },
  get dayOfWeek() {
    return codeSchema.backward.array().optional()
  },
  get timeOfDay() {
    return timeSchema.backward.array().optional()
  },
  get when() {
    return codeSchema.backward.array().optional()
  },
  get offset() {
    return positiveIntSchema.backward.optional()
  },
})

export const timingBackwardSchema = backBoneElementBackwardSchema.extend({
  get event() {
    return dateTimeSchema.backward.array().optional()
  },
  get repeat() {
    return timingRepeatBackwardSchema.optional()
  },
  get code() {
    return codeableConceptBackwardSchema.optional()
  },
})
