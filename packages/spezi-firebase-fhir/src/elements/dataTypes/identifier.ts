//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Identifier } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { codeableConceptSchema } from './codeableConcept.js'
import { periodSchema } from './period.js'
import { stringSchema, uriSchema } from './primitiveTypes.js'
import { referenceSchema } from './reference.js'
import { elementSchema } from '../element.js'

export const identifierUseSchema = z.enum([
  'usual',
  'official',
  'temp',
  'secondary',
  'old',
])
export type IdentifierUse = z.infer<typeof identifierUseSchema>

export const identifierSchema: ZodType<Identifier> = z.lazy(() =>
  elementSchema.extend({
    use: identifierUseSchema.optional(),
    _use: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    system: uriSchema.optional(),
    _system: elementSchema.optional(),
    value: stringSchema.optional(),
    _value: elementSchema.optional(),
    period: periodSchema.optional(),
    assigner: referenceSchema.optional(),
  }),
)
