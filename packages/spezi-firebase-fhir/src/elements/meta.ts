//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { instantSchema } from '../primitiveTypes/instant.js'
import {
  codingBackwardSchema,
  codingForwardSchema,
} from '../dataTypes/coding.js'
import { elementBackwardSchema, elementForwardSchema } from './element.js'

export const metaForwardSchema = elementForwardSchema.extend({
  get versionId() {
    return z.string().optional()
  },
  get lastUpdated() {
    return instantSchema.forward.optional()
  },
  get source() {
    return uriSchema.forward.optional()
  },
  get profile() {
    return uriSchema.forward.array().optional()
  },
  get security() {
    return codingForwardSchema.array().optional()
  },
  get tag() {
    return codingForwardSchema.array().optional()
  },
})

export const metaBackwardSchema = elementBackwardSchema.extend({
  get versionId() {
    return z.string().optional()
  },
  get lastUpdated() {
    return instantSchema.backward.optional()
  },
  get source() {
    return uriSchema.backward.optional()
  },
  get profile() {
    return uriSchema.backward.array().optional()
  },
  get security() {
    return codingBackwardSchema.array().optional()
  },
  get tag() {
    return codingBackwardSchema.array().optional()
  },
})
