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
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { referenceForwardSchema, referenceBackwardSchema } from '../dataTypes/reference.js'
import { timingForwardSchema, timingBackwardSchema } from '../dataTypes/timing.js'
import { dateSchema } from '../primitiveTypes/date.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { dataRequirementForwardSchema, dataRequirementBackwardSchema } from './dataRequirement.js'
import { expressionForwardSchema, expressionBackwardSchema } from './expression.js'

export const triggerDefinitionForwardSchema = elementForwardSchema.extend({
  type: codeSchema.forward,
  name: optionalish(z.string()),
  code: optionalish(codeableConceptSchema),
  subscriptionTopic: optionalish(z.string()),
  timingTiming: optionalish(timingForwardSchema),
  timingReference: optionalish(referenceForwardSchema),
  timingDate: optionalish(dateSchema.forward),
  timingDateTime: optionalish(dateTimeSchema.forward),
  data: optionalish(dataRequirementForwardSchema.array()),
  condition: optionalish(expressionForwardSchema),
})

export const triggerDefinitionBackwardSchema = elementBackwardSchema.extend({
  type: codeSchema.backward,
  name: optionalish(z.string()),
  code: optionalish(codeableConceptSchema),
  subscriptionTopic: optionalish(z.string()),
  timingTiming: optionalish(timingBackwardSchema),
  timingReference: optionalish(referenceBackwardSchema),
  timingDate: optionalish(dateSchema.backward),
  timingDateTime: optionalish(dateTimeSchema.backward),
  data: optionalish(dataRequirementBackwardSchema.array()),
  condition: optionalish(expressionBackwardSchema),
})
