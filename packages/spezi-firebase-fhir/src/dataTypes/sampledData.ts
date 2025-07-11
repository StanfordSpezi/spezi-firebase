//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import { positiveIntSchema } from '../primitiveTypes/primitiveTypes.js'
import { quantityBackwardSchema, quantityForwardSchema } from './quantity.js'

export const sampledDataForwardSchema = elementForwardSchema.extend({
  get origin() {
    return quantityForwardSchema.optional()
  },
  get period() {
    return z.number().positive()
  },
  get factor() {
    return z.number().optional()
  },
  get lowerLimit() {
    return z.number().optional()
  },
  get upperLimit() {
    return z.number().optional()
  },
  get dimensions() {
    return positiveIntSchema.forward.optional()
  },
  get data() {
    return z.string().optional()
  },
})

export const sampledDataBackwardSchema = elementBackwardSchema.extend({
  get origin() {
    return quantityBackwardSchema.optional()
  },
  get period() {
    return z.number().positive()
  },
  get factor() {
    return z.number().optional()
  },
  get lowerLimit() {
    return z.number().optional()
  },
  get upperLimit() {
    return z.number().optional()
  },
  get dimensions() {
    return positiveIntSchema.backward.optional()
  },
  get data() {
    return z.string().optional()
  },
})
