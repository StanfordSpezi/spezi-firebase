//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Quantity } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'

const quantityComparator = ['<', '<=', '>=', '>'] as const

export const quantitySchema: ZodType<Quantity> = z.lazy(() =>
  elementSchema.extend({
    value: z.number().optional(),
    comparator: z.enum(quantityComparator).optional(),
    _comparator: elementSchema.optional(),
    unit: z.string().optional(),
    _unit: elementSchema.optional(),
    system: uriSchema.optional(),
    _system: elementSchema.optional(),
    code: codeSchema.optional(),
    _code: elementSchema.optional(),
  }),
)
