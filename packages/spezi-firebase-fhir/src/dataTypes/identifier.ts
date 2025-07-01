//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  BidirectionalSchema,
  optionalish,
} from '@stanfordspezi/spezi-firebase-utils'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { codeableConceptSchema } from './codeableConcept.js'
import { referenceBackwardSchema, referenceForwardSchema } from './reference.js'
import { periodSchema } from './period.js'
import { z } from 'zod/v4'

export const identifierForwardSchema = elementForwardSchema.extend({
  use: optionalish(codeSchema.forward),
  type: optionalish(codeableConceptSchema),
  system: optionalish(uriSchema.forward),
  value: optionalish(z.string()),
  period: optionalish(periodSchema.forward),
  get assigner() {
    return optionalish(referenceForwardSchema)
  },
})

export const identifierBackwardSchema = elementBackwardSchema.extend({
  use: optionalish(codeSchema.backward),
  type: optionalish(codeableConceptSchema),
  system: optionalish(uriSchema.backward),
  value: optionalish(z.string()),
  period: optionalish(periodSchema.backward),
  get assigner() {
    return optionalish(referenceBackwardSchema)
  },
})

export const identifierSchema = BidirectionalSchema.separate(
  identifierForwardSchema,
  identifierBackwardSchema,
)
