//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Contributor } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { contactDetailSchema } from './contactDetail.js'
import { stringSchema } from '../dataTypes/primitiveTypes.js'
import { elementSchema } from '../element.js'

const contributorTypeSchema = z.enum([
  'author',
  'editor',
  'reviewer',
  'endorser',
])
export type ContributorType = z.infer<typeof contributorTypeSchema>

export const contributorSchema: ZodType<Contributor> = z.lazy(() =>
  elementSchema.extend({
    type: contributorTypeSchema,
    _type: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
  }),
)
