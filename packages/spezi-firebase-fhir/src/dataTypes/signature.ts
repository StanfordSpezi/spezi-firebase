//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import {
  base64BinarySchema,
  codeSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { referenceBackwardSchema, referenceForwardSchema } from './reference.js'
import { instantSchema } from '../primitiveTypes/instant.js'
import { codingBackwardSchema, codingForwardSchema } from './coding.js'

export const signatureForwardSchema = elementForwardSchema.extend({
  get type() {
    return codingForwardSchema.array().optional() // TODO: .min(1)
  },
  get when() {
    return instantSchema.forward.optional()
  },
  get who() {
    return referenceForwardSchema.optional()
  },
  get onBehalfOf() {
    return referenceForwardSchema.optional()
  },
  get targetFormat() {
    return codeSchema.forward.optional()
  },
  get sigFormat() {
    return codeSchema.forward.optional()
  },
  get data() {
    return base64BinarySchema.forward.optional()
  },
})

export const signatureBackwardSchema = elementBackwardSchema.extend({
  get type() {
    return codingBackwardSchema.array().optional() // TODO: .min(1)
  },
  get when() {
    return instantSchema.backward.optional()
  },
  get who() {
    return referenceBackwardSchema.optional()
  },
  get onBehalfOf() {
    return referenceBackwardSchema.optional()
  },
  get targetFormat() {
    return codeSchema.backward.optional()
  },
  get sigFormat() {
    return codeSchema.backward.optional()
  },
  get data() {
    return base64BinarySchema.backward.optional()
  },
})
