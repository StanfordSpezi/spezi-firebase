//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { Element } from 'fhir/r4b.js'
import { extensionSchema } from './extension.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

export const elementSchema = z.object({
  id: z.string().optional(),
  get extension() {
    return extensionSchema.array().optional()
  },
})

type _Assert = AssertOutput<typeof elementSchema, Element>
type _AssertFull = AssertOutputFull<typeof elementSchema, Element>
