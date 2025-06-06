//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { backBoneElementSchema } from './backboneElement.js'
import {
  codeSchema,
  dateTimeSchema,
  positiveIntSchema,
  timeSchema,
} from '../dataTypes/primitiveTypes.js'
import { elementSchema } from './element.js'
import { periodSchema } from './period.js'
import { z } from 'zod'
import { codeableConceptSchema } from './codeableConcept.js'

export const timingSchema = backBoneElementSchema.extend({
  event: optionalish(dateTimeSchema.array()),
  repeat: optionalish(
    elementSchema.extend({
      // TODO: boundsDuration: optionalish(durationSchema),
      // TODO: boundsRange: optionalish(rangeSchema),
      boundsPeriod: optionalish(periodSchema),
      count: optionalish(positiveIntSchema),
      countMax: optionalish(positiveIntSchema),
      duration: optionalish(z.number()),
      durationMax: optionalish(z.number()),
      durationUnit: optionalish(codeSchema),
      frequency: optionalish(positiveIntSchema),
      frequencyMax: optionalish(positiveIntSchema),
      period: optionalish(z.number()),
      periodMax: optionalish(z.number()),
      periodUnit: optionalish(codeSchema),
      dayOfWeek: optionalish(codeSchema.array()),
      timeOfDay: optionalish(timeSchema.array()),
      when: optionalish(codeSchema.array()),
      offset: optionalish(positiveIntSchema),
    }),
  ),
  code: optionalish(codeableConceptSchema),
})
