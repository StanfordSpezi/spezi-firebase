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
import { periodBackwardSchema, periodForwardSchema } from './period.js'

export const humanNameForwardSchema = elementForwardSchema.extend({
  get use() {
    return codeSchema.forward.optional()
  },
  get text() {
    return z.string().optional()
  },
  get family() {
    return z.string().optional()
  },
  get given() {
    return z.string().array().optional()
  },
  get prefix() {
    return z.string().array().optional()
  },
  get suffix() {
    return z.string().array().optional()
  },
  get period() {
    return periodForwardSchema.optional()
  },
})

export const humanNameBackwardSchema = elementBackwardSchema.extend({
  get use() {
    return codeSchema.backward.optional()
  },
  get text() {
    return z.string().optional()
  },
  get family() {
    return z.string().optional()
  },
  get given() {
    return z.string().array().optional()
  },
  get prefix() {
    return z.string().array().optional()
  },
  get suffix() {
    return z.string().array().optional()
  },
  get period() {
    return periodBackwardSchema.optional()
  },
})
