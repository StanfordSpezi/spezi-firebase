//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { referenceSchema } from './reference.js'
import { z } from 'zod/v4'
import { periodSchema } from './period.js'
import { codeableConceptSchema } from './codeableConcept.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { Identifier } from 'fhir/r4b.js'
import { elementSchema } from '../element.js'

const identifierUse = ['usual', 'official', 'temp', 'secondary', 'old'] as const

export const identifierSchema = elementSchema.extend({
  use: z.enum(identifierUse).optional(),
  type: codeableConceptSchema.optional(),
  system: uriSchema.optional(),
  value: z.string().optional(),
  period: periodSchema.optional(),
  assigner: referenceSchema.optional(),
})

type _Assert = AssertOutput<typeof identifierSchema, Identifier>
type _AssertFull = AssertOutputFull<typeof identifierSchema, Identifier>
