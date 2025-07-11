//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { elementSchema } from '../element.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { Coding } from 'fhir/r4b.js'

export const codingSchema = elementSchema.extend({
  system: uriSchema.optional(),
  version: z.string().optional(),
  code: codeSchema.optional(),
  display: z.string().optional(),
  userSelected: z.boolean().optional(),
})

type _Assert = AssertOutput<typeof codingSchema, Coding>
type _AssertFull = AssertOutputFull<typeof codingSchema, Coding>
