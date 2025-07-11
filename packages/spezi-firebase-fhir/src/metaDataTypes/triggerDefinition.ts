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
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  referenceForwardSchema,
  referenceBackwardSchema,
} from '../dataTypes/reference.js'
import {
  timingForwardSchema,
  timingBackwardSchema,
} from '../dataTypes/timing.js'
import { dateSchema } from '../primitiveTypes/date.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import {
  dataRequirementForwardSchema,
  dataRequirementBackwardSchema,
} from './dataRequirement.js'
import {
  expressionForwardSchema,
  expressionBackwardSchema,
} from './expression.js'
import {
  codeableConceptBackwardSchema,
  codeableConceptForwardSchema,
} from '../dataTypes/codeableConcept.js'

export const triggerDefinitionForwardSchema = elementForwardSchema.extend({
  get type() {
    return codeSchema.forward
  },
  get name() {
    return z.string().optional()
  },
  get code() {
    return codeableConceptForwardSchema.optional()
  },
  get subscriptionTopic() {
    return z.string().optional()
  },
  get timingTiming() {
    return timingForwardSchema.optional()
  },
  get timingReference() {
    return referenceForwardSchema.optional()
  },
  get timingDate() {
    return dateSchema.forward.optional()
  },
  get timingDateTime() {
    return dateTimeSchema.forward.optional()
  },
  get data() {
    return dataRequirementForwardSchema.array().optional()
  },
  get condition() {
    return expressionForwardSchema.optional()
  },
})

export const triggerDefinitionBackwardSchema = elementBackwardSchema.extend({
  get type() {
    return codeSchema.backward
  },
  get name() {
    return z.string().optional()
  },
  get code() {
    return codeableConceptBackwardSchema.optional()
  },
  get subscriptionTopic() {
    return z.string().optional()
  },
  get timingTiming() {
    return timingBackwardSchema.optional()
  },
  get timingReference() {
    return referenceBackwardSchema.optional()
  },
  get timingDate() {
    return dateSchema.backward.optional()
  },
  get timingDateTime() {
    return dateTimeSchema.backward.optional()
  },
  get data() {
    return dataRequirementBackwardSchema.array().optional()
  },
  get condition() {
    return expressionBackwardSchema.optional()
  },
})
