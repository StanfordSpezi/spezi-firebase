//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Contributor } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { contactDetailSchema } from './contactDetail.js'
import { elementSchema } from '../element.js'

const contributorType = ['author', 'editor', 'reviewer', 'endorser'] as const

export const contributorSchema: ZodType<Contributor> = z.lazy(() =>
  elementSchema.extend({
    type: z.enum(contributorType),
    _type: elementSchema.optional(),
    name: z.string(),
    _name: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
  }),
)
