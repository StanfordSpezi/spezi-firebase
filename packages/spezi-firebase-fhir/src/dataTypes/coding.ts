//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'

export const codingForwardSchema = elementForwardSchema.extend({
  get system() {
    return uriSchema.forward.optional()
  },
  get version() {
    return z.string().optional()
  },
  get code() {
    return codeSchema.forward.optional()
  },
  get display() {
    return z.string().optional()
  },
  get userSelected() {
    return z.boolean().optional()
  },
})

export const codingBackwardSchema = elementBackwardSchema.extend({
  get system() {
    return uriSchema.backward.optional()
  },
  get version() {
    return z.string().optional()
  },
  get code() {
    return codeSchema.backward.optional()
  },
  get display() {
    return z.string().optional()
  },
  get userSelected() {
    return z.boolean().optional()
  },
})
