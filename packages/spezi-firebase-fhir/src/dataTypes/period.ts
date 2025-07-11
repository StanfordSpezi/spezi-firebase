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
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export const periodForwardSchema = elementForwardSchema.extend({
  get start() {
    return dateTimeSchema.forward.optional()
  },
  get end() {
    return dateTimeSchema.forward.optional()
  },
})

export const periodBackwardSchema = elementBackwardSchema.extend({
  get start() {
    return dateTimeSchema.backward.optional()
  },
  get end() {
    return dateTimeSchema.backward.optional()
  },
})
