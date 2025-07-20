//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { extensionSchema } from './extension.js'
import { Element } from 'fhir/r4b.js'

export const elementSchema = z.object({
  id: z.string().optional(),
  get _id() {
    return elementSchema.optional()
  },
  get extension() {
    return extensionSchema.array().optional()
  },
})
