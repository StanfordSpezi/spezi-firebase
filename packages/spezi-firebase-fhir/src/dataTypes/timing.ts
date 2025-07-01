//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  BidirectionalSchema,
  optionalish,
} from '@stanfordspezi/spezi-firebase-utils'
import {
  backBoneelementBackwardSchema,
  backBoneElementForwardSchema,
} from '../elements/backBoneElement.js'
import {
  codeSchema,
  positiveIntSchema,
  timeSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { elementForwardSchema } from '../elements/element.js'
import { periodBackwardSchema, periodForwardSchema } from './period.js'
import { z } from 'zod/v4'
import { codeableConceptSchema } from './codeableConcept.js'
import { rangeSchema } from './range.js'
import { quantitySchema } from './quantity.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export const timingForwardSchema = backBoneElementForwardSchema.extend({
  event: optionalish(dateTimeSchema.forward.array()),
  repeat: optionalish(
    elementForwardSchema.extend({
      boundsDuration: optionalish(quantitySchema),
      boundsRange: optionalish(rangeSchema),
      boundsPeriod: optionalish(periodForwardSchema),
      count: optionalish(positiveIntSchema.forward),
      countMax: optionalish(positiveIntSchema.forward),
      duration: optionalish(z.number()),
      durationMax: optionalish(z.number()),
      durationUnit: optionalish(codeSchema.forward),
      frequency: optionalish(positiveIntSchema.forward),
      frequencyMax: optionalish(positiveIntSchema.forward),
      period: optionalish(z.number()),
      periodMax: optionalish(z.number()),
      periodUnit: optionalish(codeSchema.forward),
      dayOfWeek: optionalish(codeSchema.forward.array()),
      timeOfDay: optionalish(timeSchema.forward.array()),
      when: optionalish(codeSchema.forward.array()),
      offset: optionalish(positiveIntSchema.forward),
    }),
  ),
  code: optionalish(codeableConceptSchema),
})

export const timingBackwardSchema = backBoneelementBackwardSchema.extend({
  event: optionalish(dateTimeSchema.backward.array()),
  repeat: optionalish(
    elementForwardSchema.extend({
      boundsDuration: optionalish(quantitySchema),
      boundsRange: optionalish(rangeSchema),
      boundsPeriod: optionalish(periodBackwardSchema),
      count: optionalish(positiveIntSchema.backward),
      countMax: optionalish(positiveIntSchema.backward),
      duration: optionalish(z.number()),
      durationMax: optionalish(z.number()),
      durationUnit: optionalish(codeSchema.backward),
      frequency: optionalish(positiveIntSchema.backward),
      frequencyMax: optionalish(positiveIntSchema.backward),
      period: optionalish(z.number()),
      periodMax: optionalish(z.number()),
      periodUnit: optionalish(codeSchema.backward),
      dayOfWeek: optionalish(codeSchema.backward.array()),
      timeOfDay: optionalish(timeSchema.backward.array()),
      when: optionalish(codeSchema.backward.array()),
      offset: optionalish(positiveIntSchema.backward),
    }),
  ),
  code: optionalish(codeableConceptSchema),
})

export const timingSchema = BidirectionalSchema.separate(
  timingForwardSchema,
  timingBackwardSchema,
)
