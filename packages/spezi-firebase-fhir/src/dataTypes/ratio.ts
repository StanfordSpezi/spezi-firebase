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
import { quantityBackwardSchema, quantityForwardSchema } from './quantity.js'

export const ratioForwardSchema = elementForwardSchema.extend({
  get numerator() {
    return quantityForwardSchema.optional()
  },
  get denominator() {
    return quantityForwardSchema.optional()
  },
})

export const ratioBackwardSchema = elementBackwardSchema.extend({
  get numerator() {
    return quantityBackwardSchema.optional()
  },
  get denominator() {
    return quantityBackwardSchema.optional()
  },
})
