//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod/v4'
import { extensionBackwardSchema, extensionForwardSchema } from './extension.js'

const idSchema = optionalish(z.string())

export const elementForwardSchema = z.object({
  id: idSchema,
  get extension() {
    return extensionForwardSchema.array().optional()
  },
})

export const elementBackwardSchema = z.object({
  id: idSchema,
  get extension() {
    return extensionBackwardSchema.array().optional()
  },
})

export type ElementDto = z.input<typeof elementForwardSchema>
export type Element = z.output<typeof elementForwardSchema>
