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
import { z } from 'zod/v4'
import { uriSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  identifierBackwardSchema,
  identifierForwardSchema,
} from './identifier.js'

export const referenceForwardSchema = elementForwardSchema.extend({
  get reference() {
    return z.string().optional()
  },
  get type() {
    return uriSchema.forward.optional()
  },
  get identifier() {
    return identifierForwardSchema.optional()
  },
  get display() {
    return z.string().optional()
  },
})

export const referenceBackwardSchema = elementBackwardSchema.extend({
  get reference() {
    return z.string().optional()
  },
  get type() {
    return uriSchema.forward.optional()
  },
  get identifier() {
    return identifierBackwardSchema.optional()
  },
  get display() {
    return z.string().optional()
  },
})
