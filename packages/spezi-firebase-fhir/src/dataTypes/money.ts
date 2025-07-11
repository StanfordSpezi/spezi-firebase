//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import { z } from 'zod/v4'

export const moneyForwardSchema = elementForwardSchema.extend({
  get value() {
    return z.number().optional()
  },
  get currency() {
    return codeSchema.forward.optional()
  },
})

export const moneyBackwardSchema = elementBackwardSchema.extend({
  get value() {
    return z.number().optional()
  },
  get currency() {
    return codeSchema.backward.optional()
  },
})
