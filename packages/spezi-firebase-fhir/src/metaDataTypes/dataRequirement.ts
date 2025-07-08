//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { elementForwardSchema, elementBackwardSchema } from '../elements/element.js'
import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { codeSchema, positiveIntSchema } from '../primitiveTypes/primitiveTypes.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { referenceForwardSchema, referenceBackwardSchema } from '../dataTypes/reference.js'
import { codingSchema } from '../dataTypes/coding.js'
import { periodForwardSchema, periodBackwardSchema } from '../dataTypes/period.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

const codeFilterForwardSchema = z.object({
  path: optionalish(z.string()),
  searchParam: optionalish(z.string()),
  valueSet: optionalish(z.string()),
  code: optionalish(codingSchema.array()),
})

const codeFilterBackwardSchema = z.object({
  path: optionalish(z.string()),
  searchParam: optionalish(z.string()),
  valueSet: optionalish(z.string()),
  code: optionalish(codingSchema.array()),
})

const dateFilterForwardSchema = z.object({
  path: optionalish(z.string()),
  searchParam: optionalish(z.string()),
  valueDateTime: optionalish(dateTimeSchema.forward),
  valuePeriod: optionalish(periodForwardSchema),
})

const dateFilterBackwardSchema = z.object({
  path: optionalish(z.string()),
  searchParam: optionalish(z.string()),
  valueDateTime: optionalish(dateTimeSchema.backward),
  valuePeriod: optionalish(periodBackwardSchema),
})

const sortForwardSchema = z.object({
  path: z.string(),
  direction: codeSchema.forward,
})

const sortBackwardSchema = z.object({
  path: z.string(),
  direction: codeSchema.backward,
})

export const dataRequirementForwardSchema = elementForwardSchema.extend({
  type: codeSchema.forward,
  profile: optionalish(z.string().array()),
  subjectCodeableConcept: optionalish(codeableConceptSchema),
  subjectReference: optionalish(referenceForwardSchema),
  mustSupport: optionalish(z.string().array()),
  codeFilter: optionalish(codeFilterForwardSchema.array()),
  dateFilter: optionalish(dateFilterForwardSchema.array()),
  limit: optionalish(positiveIntSchema.forward),
  sort: optionalish(sortForwardSchema.array()),
})

export const dataRequirementBackwardSchema = elementBackwardSchema.extend({
  type: codeSchema.backward,
  profile: optionalish(z.string().array()),
  subjectCodeableConcept: optionalish(codeableConceptSchema),
  subjectReference: optionalish(referenceBackwardSchema),
  mustSupport: optionalish(z.string().array()),
  codeFilter: optionalish(codeFilterBackwardSchema.array()),
  dateFilter: optionalish(dateFilterBackwardSchema.array()),
  limit: optionalish(positiveIntSchema.backward),
  sort: optionalish(sortBackwardSchema.array()),
})