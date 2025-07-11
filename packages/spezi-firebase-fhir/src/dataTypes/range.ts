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

export const rangeForwardSchema = elementForwardSchema.extend({
  get low() {
    return quantityForwardSchema.optional()
  },
  get high() {
    return quantityForwardSchema.optional()
  },
})

export const rangeBackwardSchema = elementBackwardSchema.extend({
  get low() {
    return quantityBackwardSchema.optional()
  },
  get high() {
    return quantityBackwardSchema.optional()
  },
})
