//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { codeSchema, uriSchema } from '../primitiveTypes/primitiveTypes.js'

export const codingSchema: ZodType<Coding> = z.lazy(() =>
  elementSchema.extend({
    system: uriSchema.optional(),
    _system: elementSchema.optional(),
    version: z.string().optional(),
    _version: elementSchema.optional(),
    code: codeSchema.optional(),
    _code: elementSchema.optional(),
    display: z.string().optional(),
    _display: elementSchema.optional(),
    userSelected: z.boolean().optional(),
    _userSelected: elementSchema.optional(),
  }),
)
