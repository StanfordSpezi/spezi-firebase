//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { elementSchema } from '../element.js'
import {
  codeSchema,
  idSchema,
  uriSchema,
} from '../primitiveTypes/primitiveTypes.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { Expression } from 'fhir/r4b.js'

export const expressionSchema = elementSchema.extend({
  description: z.string().optional(),
  name: idSchema.optional(),
  language: codeSchema,
  expression: z.string().optional(),
  reference: uriSchema.optional(),
})

type _Assert = AssertOutput<typeof expressionSchema, Expression>
type _AssertFull = AssertOutputFull<typeof expressionSchema, Expression>
