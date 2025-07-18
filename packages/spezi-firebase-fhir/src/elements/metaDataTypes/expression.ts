//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Expression } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import {
  codeSchema,
  idSchema,
  uriSchema,
} from '../primitiveTypes/primitiveTypes.js'

export const expressionSchema: ZodType<Expression> = z.lazy(() =>
  elementSchema.extend({
    description: z.string().optional(),
    _description: elementSchema.optional(),
    name: idSchema.optional(),
    _name: elementSchema.optional(),
    language: codeSchema,
    _language: elementSchema.optional(),
    expression: z.string().optional(),
    _expression: elementSchema.optional(),
    reference: uriSchema.optional(),
    _reference: elementSchema.optional(),
  }),
)
