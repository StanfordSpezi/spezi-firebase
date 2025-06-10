//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Input, Output, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod/v4'
import { extensionSchema } from './extension.js'

export const elementSchema = Schema.composed({
  id: Schema.simple(z.string()).optionalish(),
  get extension() {
    return extensionSchema.array()
  },
})

export type ElementDto = Input<typeof elementSchema>
export type Element = Output<typeof elementSchema>
