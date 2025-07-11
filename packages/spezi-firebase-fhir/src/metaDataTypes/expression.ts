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
  idSchema,
  uriSchema,
} from '../primitiveTypes/primitiveTypes.js'

export const expressionForwardSchema = elementForwardSchema.extend({
  get description() {
    return z.string().optional()
  },
  get name() {
    return idSchema.forward.optional()
  },
  get language() {
    return codeSchema.forward
  },
  get expression() {
    return z.string().optional()
  },
  get reference() {
    return uriSchema.forward.optional()
  },
})

export const expressionBackwardSchema = elementBackwardSchema.extend({
  get description() {
    return z.string().optional()
  },
  get name() {
    return idSchema.backward.optional()
  },
  get language() {
    return codeSchema.backward
  },
  get expression() {
    return z.string().optional()
  },
  get reference() {
    return uriSchema.backward.optional()
  },
})
