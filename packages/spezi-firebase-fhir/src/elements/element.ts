//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { extensionBackwardSchema, extensionForwardSchema } from './extension.js'

export const elementForwardSchema = z.object({
  get id() {
    return z.string().optional()
  },
  get extension() {
    return extensionForwardSchema.array().optional()
  },
})

export const elementBackwardSchema = z.object({
  get id() {
    return z.string().optional()
  },
  get extension() {
    return extensionBackwardSchema.array().optional()
  },
})

export type ElementDto = z.input<typeof elementForwardSchema>
export type Element = z.output<typeof elementForwardSchema>
