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

export const ratioRangeForwardSchema = elementForwardSchema.extend({
  get lowNumerator() {
    return quantityForwardSchema.optional()
  },
  get highNumerator() {
    return quantityForwardSchema.optional()
  },
  get denominator() {
    return quantityForwardSchema.optional()
  },
})

export const ratioRangeBackwardSchema = elementBackwardSchema.extend({
  get lowNumerator() {
    return quantityBackwardSchema.optional()
  },
  get highNumerator() {
    return quantityBackwardSchema.optional()
  },
  get denominator() {
    return quantityBackwardSchema.optional()
  },
})
