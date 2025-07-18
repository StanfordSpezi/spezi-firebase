//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Reference } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { identifierSchema } from './identifier.js'
import { elementSchema } from '../element.js'
import { uriSchema } from '../primitiveTypes/primitiveTypes.js'

export const referenceSchema: ZodType<Reference> = z.lazy(() =>
  elementSchema.extend({
    reference: z.string().optional(),
    _reference: elementSchema.optional(),
    type: uriSchema.optional(),
    _type: elementSchema.optional(),
    get identifier() {
      return identifierSchema.optional()
    },
    display: z.string().optional(),
    _display: elementSchema.optional(),
  }),
)
