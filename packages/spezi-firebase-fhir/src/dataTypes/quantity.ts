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
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'

export const quantityForwardSchema = elementForwardSchema.extend({
  get value() {
    return z.number().optional()
  },
  get comparator() {
    return codeSchema.forward.optional()
  },
  get unit() {
    return z.string().optional()
  },
  get system() {
    return uriSchema.forward.optional()
  },
  get code() {
    return codeSchema.forward.optional()
  },
})

export const quantityBackwardSchema = elementBackwardSchema.extend({
  get value() {
    return z.number().optional()
  },
  get comparator() {
    return codeSchema.backward.optional()
  },
  get unit() {
    return z.string().optional()
  },
  get system() {
    return uriSchema.backward.optional()
  },
  get code() {
    return codeSchema.backward.optional()
  },
})
