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
import { z } from 'zod/v4'
import { uriSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  identifierBackwardSchema,
  identifierForwardSchema,
} from './identifier.js'

export const referenceForwardSchema = elementForwardSchema.extend({
  reference: optionalish(z.string()),
  type: optionalish(uriSchema.forward),
  get identifier() {
    return optionalish(identifierForwardSchema)
  },
  display: optionalish(z.string()),
})

export const referenceBackwardSchema = elementBackwardSchema.extend({
  reference: optionalish(z.string()),
  type: optionalish(uriSchema.backward),
  get identifier() {
    return optionalish(identifierBackwardSchema)
  },
  display: optionalish(z.string()),
})

export const referenceSchema = BidirectionalSchema.separate(
  referenceForwardSchema,
  referenceBackwardSchema,
)
