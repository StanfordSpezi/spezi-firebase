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
import { elementForwardSchema } from '../elements/element.js'
import { codingSchema } from './coding.js'
import {
  base64BinarySchema,
  codeSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { referenceForwardSchema } from './reference.js'
import { instantSchema } from '../primitiveTypes/instant.js'

export const signatureForwardSchema = elementForwardSchema.extend({
  type: codingSchema.array(), // TODO: .min(1)
  when: instantSchema,
  who: referenceForwardSchema,
  onBehalfOf: optionalish(referenceForwardSchema),
  targetFormat: optionalish(codeSchema.forward),
  sigFormat: optionalish(codeSchema.forward),
  data: optionalish(base64BinarySchema.forward),
})

export const signatureBackwardSchema = elementForwardSchema.extend({
  type: codingSchema.array(), // TODO: .min(1)
  when: instantSchema,
  who: referenceForwardSchema,
  onBehalfOf: optionalish(referenceForwardSchema),
  targetFormat: optionalish(codeSchema.forward),
  sigFormat: optionalish(codeSchema.forward),
  data: optionalish(base64BinarySchema.forward),
})

export const signatureSchema = BidirectionalSchema.separate(
  signatureForwardSchema,
  signatureBackwardSchema,
)
