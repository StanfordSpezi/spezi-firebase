//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { periodBackwardSchema, periodForwardSchema } from './period.js'
import { z } from 'zod/v4'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'

export type AddressDto = z.input<typeof addressForwardSchema>
export type Address = z.output<typeof addressForwardSchema>

export const addressForwardSchema = elementForwardSchema.extend({
  get use() {
    return codeSchema.forward.optional()
  },
  get type() {
    return codeSchema.forward.optional()
  },
  get text() {
    return z.string().optional()
  },
  get line() {
    return z.string().array().optional()
  },
  get city() {
    return z.string().optional()
  },
  get district() {
    return z.string().optional()
  },
  get state() {
    return z.string().optional()
  },
  get postalCode() {
    return z.string().optional()
  },
  get country() {
    return z.string().optional()
  },
  get period() {
    return periodForwardSchema.optional()
  },
})

export const addressBackwardSchema = elementBackwardSchema.extend({
  get use() {
    return codeSchema.backward.optional()
  },
  get type() {
    return codeSchema.backward.optional()
  },
  get text() {
    return z.string().optional()
  },
  get line() {
    return z.string().array().optional()
  },
  get city() {
    return z.string().optional()
  },
  get district() {
    return z.string().optional()
  },
  get state() {
    return z.string().optional()
  },
  get postalCode() {
    return z.string().optional()
  },
  get country() {
    return z.string().optional()
  },
  get period() {
    return periodBackwardSchema.optional()
  },
})
