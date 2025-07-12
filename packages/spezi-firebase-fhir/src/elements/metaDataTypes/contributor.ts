//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import { elementSchema } from '../element.js'
import { contactDetailSchema } from './contactDetail.js'
import { z, ZodType } from 'zod/v4'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { Contributor } from 'fhir/r4b.js'

const contributorType = ['author', 'editor', 'reviewer', 'endorser'] as const

export const contributorSchema: ZodType<Contributor> = z.lazy(() =>
  elementSchema.extend({
    type: z.enum(contributorType),
    name: z.string(),
    contact: contactDetailSchema.array().optional(),
  }),
)

type _Assert = AssertOutput<typeof contributorSchema, Contributor>
type _AssertFull = AssertOutputFull<typeof contributorSchema, Contributor>
