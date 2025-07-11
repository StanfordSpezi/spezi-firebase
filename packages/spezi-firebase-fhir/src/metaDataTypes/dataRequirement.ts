//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import {
  elementForwardSchema,
  elementBackwardSchema,
} from '../elements/element.js'
import {
  codeSchema,
  positiveIntSchema,
} from '../primitiveTypes/primitiveTypes.js'
import {
  referenceForwardSchema,
  referenceBackwardSchema,
} from '../dataTypes/reference.js'
import {
  periodForwardSchema,
  periodBackwardSchema,
} from '../dataTypes/period.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import {
  codingBackwardSchema,
  codingForwardSchema,
} from '../dataTypes/coding.js'
import {
  codeableConceptBackwardSchema,
  codeableConceptForwardSchema,
} from '../dataTypes/codeableConcept.js'

const codeFilterForwardSchema = z.object({
  get path() {
    return z.string().optional()
  },
  get searchParam() {
    return z.string().optional()
  },
  get valueSet() {
    return z.string().optional()
  },
  get code() {
    return codingForwardSchema.array().optional()
  },
})

const codeFilterBackwardSchema = z.object({
  get path() {
    return z.string().optional()
  },
  get searchParam() {
    return z.string().optional()
  },
  get valueSet() {
    return z.string().optional()
  },
  get code() {
    return codingBackwardSchema.array().optional()
  },
})

const dateFilterForwardSchema = z.object({
  get path() {
    return z.string().optional()
  },
  get searchParam() {
    return z.string().optional()
  },
  get valueDateTime() {
    return dateTimeSchema.forward.optional()
  },
  get valuePeriod() {
    return periodForwardSchema.optional()
  },
})

const dateFilterBackwardSchema = z.object({
  get path() {
    return z.string().optional()
  },
  get searchParam() {
    return z.string().optional()
  },
  get valueDateTime() {
    return dateTimeSchema.backward.optional()
  },
  get valuePeriod() {
    return periodBackwardSchema.optional()
  },
})

const sortForwardSchema = z.object({
  get path() {
    return z.string()
  },
  get direction() {
    return codeSchema.forward
  },
})

const sortBackwardSchema = z.object({
  get path() {
    return z.string()
  },
  get direction() {
    return codeSchema.backward
  },
})

export const dataRequirementForwardSchema = elementForwardSchema.extend({
  get type() {
    return codeSchema.forward
  },
  get profile() {
    return z.string().array().optional()
  },
  get subjectCodeableConcept() {
    return codeableConceptForwardSchema.optional()
  },
  get subjectReference() {
    return referenceForwardSchema.optional()
  },
  get mustSupport() {
    return z.string().array().optional()
  },
  get codeFilter() {
    return codeFilterForwardSchema.array().optional()
  },
  get dateFilter() {
    return dateFilterForwardSchema.array().optional()
  },
  get limit() {
    return positiveIntSchema.forward.optional()
  },
  get sort() {
    return sortForwardSchema.array().optional()
  },
})

export const dataRequirementBackwardSchema = elementBackwardSchema.extend({
  get type() {
    return codeSchema.backward
  },
  get profile() {
    return z.string().array().optional()
  },
  get subjectCodeableConcept() {
    return codeableConceptBackwardSchema.optional()
  },
  get subjectReference() {
    return referenceBackwardSchema.optional()
  },
  get mustSupport() {
    return z.string().array().optional()
  },
  get codeFilter() {
    return codeFilterBackwardSchema.array().optional()
  },
  get dateFilter() {
    return dateFilterBackwardSchema.array().optional()
  },
  get limit() {
    return positiveIntSchema.backward.optional()
  },
  get sort() {
    return sortBackwardSchema.array().optional()
  },
})
