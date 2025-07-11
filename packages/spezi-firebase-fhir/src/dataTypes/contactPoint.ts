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
import {
  codeSchema,
  positiveIntSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { z } from 'zod/v4'
import { periodBackwardSchema, periodForwardSchema } from './period.js'

export const contactPointForwardSchema = elementForwardSchema.extend({
  get system() {
    return codeSchema.forward.optional()
  },
  get value() {
    return z.string().optional()
  },
  get use() {
    return codeSchema.forward.optional()
  },
  get rank() {
    return positiveIntSchema.forward.optional()
  },
  get period() {
    return periodForwardSchema.optional()
  },
})

export const contactPointBackwardSchema = elementBackwardSchema.extend({
  get system() {
    return codeSchema.backward.optional()
  },
  get value() {
    return z.string().optional()
  },
  get use() {
    return codeSchema.backward.optional()
  },
  get rank() {
    return positiveIntSchema.backward.optional()
  },
  get period() {
    return periodBackwardSchema.optional()
  },
})
