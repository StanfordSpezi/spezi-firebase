//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { backBoneElementSchema } from '../elements/backBoneElement.js'
import {
  codeSchema,
  positiveIntSchema,
  timeSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { elementSchema } from '../elements/element.js'
import { periodSchema } from './period.js'
import { z } from 'zod/v4'
import { codeableConceptSchema } from './codeableConcept.js'
import { rangeSchema } from './range.js'
import { quantitySchema } from './quantity.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export const timingSchema = backBoneElementSchema.extend({
  event: optionalish(dateTimeSchema.array()),
  repeat: optionalish(
    elementSchema.extend({
      boundsDuration: optionalish(quantitySchema),
      boundsRange: optionalish(rangeSchema),
      boundsPeriod: optionalish(periodSchema),
      count: optionalish(positiveIntSchema),
      countMax: optionalish(positiveIntSchema),
      duration: optionalish(Schema.simple(z.number())),
      durationMax: optionalish(Schema.simple(z.number())),
      durationUnit: optionalish(codeSchema),
      frequency: optionalish(positiveIntSchema),
      frequencyMax: optionalish(positiveIntSchema),
      period: optionalish(Schema.simple(z.number())),
      periodMax: optionalish(Schema.simple(z.number())),
      periodUnit: optionalish(codeSchema),
      dayOfWeek: optionalish(codeSchema.array()),
      timeOfDay: optionalish(timeSchema.array()),
      when: optionalish(codeSchema.array()),
      offset: optionalish(positiveIntSchema),
    }),
  ),
  code: optionalish(codeableConceptSchema),
})
