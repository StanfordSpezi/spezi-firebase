//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { metaForwardSchema, metaBackwardSchema } from './meta.js'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'

export const resourceForwardSchema = z.object({
  get id() {
    return z.string().optional()
  },
  get meta() {
    return metaForwardSchema.optional()
  },
  get implicitRules() {
    return uriSchema.forward.optional()
  },
  get language() {
    return codeSchema.forward.optional()
  },
})

export const resourceBackwardSchema = z.object({
  get id() {
    return z.string().optional()
  },
  get meta() {
    return metaBackwardSchema.optional()
  },
  get implicitRules() {
    return uriSchema.backward.optional()
  },
  get language() {
    return codeSchema.backward.optional()
  },
})
