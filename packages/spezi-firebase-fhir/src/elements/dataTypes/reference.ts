//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { elementSchema } from '../element.js'
import { z } from 'zod/v4'
import { uriSchema } from '../primitiveTypes/primitiveTypes.js'
import { Reference } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { identifierSchema } from './identifier.js'

export const referenceSchema = elementSchema.extend({
  reference: z.string().optional(),
  type: uriSchema.optional(),
  get identifier() {
    return identifierSchema.optional()
  },
  display: z.string().optional(),
})

type _Assert = AssertOutput<typeof referenceSchema, Reference>
type _AssertFull = AssertOutputFull<typeof referenceSchema, Reference>
